import { Inject, Injectable } from '@nestjs/common';
import { AlbumId } from '../albums/album';
import { ImageId } from '../../../shared/src';
import { ALBUM_PHOTOS_REPOSITORY_TOKEN } from './providers';
import { ImagesService } from '../images/images.service';
import { AlbumImages } from './album-image';
import { zipMap } from '../common/arrays';
import { ALBUMS_REPOSITORY_TOKEN } from '../albums/providers';
import { AlbumsRepository } from '../albums/create-album.use-case';

export interface AlbumPhotosRepository {
  addPhotosToAlbum({
    albumId,
    photosIds,
  }: {
    albumId: AlbumId;
    photosIds: ImageId[];
  }): Promise<void>;
  getAlbumPhotosIds({ albumId }: { albumId: AlbumId }): Promise<ImageId[]>;
}

export class UserUnauthorizedToEditAlbum extends Error {
  constructor(albumId: string, userId: string) {
    super(`User ${userId} is not the owner of album ${albumId}`);
  }
}
@Injectable()
export class AlbumPhotosService {
  constructor(
    @Inject(ALBUM_PHOTOS_REPOSITORY_TOKEN)
    private albumPhotosRepo: AlbumPhotosRepository,
    private imagesService: ImagesService,
    @Inject(ALBUMS_REPOSITORY_TOKEN) private albumsRepo: AlbumsRepository,
  ) {}

  async addPhotosToAlbum({
    userId,
    albumId,
    photosIds,
  }: {
    albumId: AlbumId;
    photosIds: ImageId[];
    userId: string;
  }) {
    await this._checkUserOwnsAlbum({ albumId, userId });

    const photosToAdd = await this._filterOutPhotosAlreadyInAlbum({
      albumId,
      photosIds,
    });

    await this.albumPhotosRepo.addPhotosToAlbum({
      albumId,
      photosIds: photosToAdd,
    });
  }

  private async _filterOutPhotosAlreadyInAlbum({
    albumId,
    photosIds,
  }: {
    albumId: AlbumId;
    photosIds: ImageId[];
  }) {
    const albumPhotosIds = await this.albumPhotosRepo.getAlbumPhotosIds({
      albumId,
    });

    const photosToAdd = photosIds.filter((id) => !albumPhotosIds.includes(id));
    return photosToAdd;
  }

  async getAlbumPhotos(albumId: AlbumId): Promise<AlbumImages> {
    const photosIds = await this.albumPhotosRepo.getAlbumPhotosIds({ albumId });

    const urls = await this.imagesService.getImagesUrlsFromIds(photosIds);

    return zipMap(photosIds, urls, (id, url) => ({ id, url }));
  }

  private async _checkUserOwnsAlbum({
    albumId,
    userId,
  }: {
    albumId: AlbumId;
    userId: string;
  }) {
    const album = await this.albumsRepo.getAlbumById(albumId);
    if (!album.isOwnedByUser({ userId }))
      throw new UserUnauthorizedToEditAlbum(albumId, userId);
  }
}
