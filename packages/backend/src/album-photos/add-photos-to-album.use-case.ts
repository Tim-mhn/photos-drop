import { Inject, Injectable } from '@nestjs/common';
import { AlbumId } from '../albums/album';
import { ImageId } from '../../../shared/src';
import { ALBUM_PHOTOS_REPOSITORY_TOKEN } from './providers';
import { ImagesService } from '../images/images.service';
import { AlbumImages } from './album-image';
import { zipMap } from '../common/arrays';

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
@Injectable()
export class AlbumPhotosService {
  constructor(
    @Inject(ALBUM_PHOTOS_REPOSITORY_TOKEN)
    private albumPhotosRepo: AlbumPhotosRepository,
    private imagesService: ImagesService,
  ) {}

  async addPhotosToAlbum({
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
    await this.albumPhotosRepo.addPhotosToAlbum({
      albumId,
      photosIds: photosToAdd,
    });
  }

  async getAlbumPhotos(albumId: AlbumId): Promise<AlbumImages> {
    const photosIds = await this.albumPhotosRepo.getAlbumPhotosIds({ albumId });

    const urls = await this.imagesService.getImagesUrlsFromIds(photosIds);

    return zipMap(photosIds, urls, (id, url) => ({ id, url }));
  }
}
