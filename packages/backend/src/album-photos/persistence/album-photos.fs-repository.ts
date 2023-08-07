import * as path from 'path';
import { AlbumId } from '../../albums/album';
import { ImageId } from '../../../../shared/src';
import { AlbumPhotosRepository } from '../add-photos-to-album.use-case';
import { readJSONFile, writeJSONFile } from '../../common/fs';

const ALBUM_PHOTOS_FILE = path.join(
  process.cwd(),
  'src',
  'album-photos',
  'persistence',
  'album-photos.json',
);

type AlbumPhotoPersistenceModel = Record<AlbumId, ImageId[]>;

export class FileSystemAlbumPhotosRepository implements AlbumPhotosRepository {
  async addPhotosToAlbum({
    albumId,
    photosIds,
  }: {
    albumId: AlbumId;
    photosIds: ImageId[];
  }): Promise<void> {
    const data = await this._getAllData();
    const albumPhotos = data[albumId] || [];
    const allPhotos = [...albumPhotos, ...photosIds];
    data[albumId] = allPhotos;
    await writeJSONFile(ALBUM_PHOTOS_FILE, data);
  }
  async getAlbumPhotosIds({
    albumId,
  }: {
    albumId: AlbumId;
  }): Promise<ImageId[]> {
    const data = await this._getAllData();
    return data[albumId] || [];
  }

  private async _getAllData() {
    return await readJSONFile<AlbumPhotoPersistenceModel>(ALBUM_PHOTOS_FILE);
  }
}
