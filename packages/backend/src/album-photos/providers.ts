import { Provider } from '@nestjs/common';
import { FileSystemAlbumPhotosRepository } from './persistence/album-photos.fs-repository';

export const ALBUM_PHOTOS_REPOSITORY_TOKEN = 'album-photos-repository';

export const AlbumPhotosRepositoryProvider: Provider = {
  provide: ALBUM_PHOTOS_REPOSITORY_TOKEN,
  useClass: FileSystemAlbumPhotosRepository,
};
