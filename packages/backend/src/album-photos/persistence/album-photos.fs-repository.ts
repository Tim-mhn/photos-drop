import { AlbumId } from '../../albums/album';
import { ImageId } from '../../../../shared/src';
import { AlbumPhotosRepository } from '../add-photos-to-album.use-case';
import { readJSONFile, writeJSONFile } from '../../common/fs';
import {
  ALBUMS_FILE,
  AlbumPersistenceModel,
} from '../../albums/persistence/albums.fs-2-repository';

const ALBUM_PHOTOS_FILE = ALBUMS_FILE;

export class FileSystemAlbumPhotosRepository implements AlbumPhotosRepository {
  async addPhotosToAlbum({
    albumId,
    photosIds,
  }: {
    albumId: AlbumId;
    photosIds: ImageId[];
  }): Promise<void> {
    const albums = await this._getAllData();
    const album = albums.find((alb) => alb.id === albumId);
    album.photosIds.push(...photosIds);
    await writeJSONFile(ALBUM_PHOTOS_FILE, albums);
  }
  async getAlbumPhotosIds({
    albumId,
  }: {
    albumId: AlbumId;
  }): Promise<ImageId[]> {
    const albums = await this._getAllData();
    return albums.find((album) => album.id === albumId)?.photosIds;
  }

  private async _getAllData() {
    return await readJSONFile<AlbumPersistenceModel>(ALBUM_PHOTOS_FILE);
  }
}
