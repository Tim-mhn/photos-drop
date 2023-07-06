import { Provider } from '@nestjs/common';
import { FileSystemAlbumsRepository } from './persistence/albums.fs-repository';

export const ALBUMS_REPOSITORY_TOKEN = 'albums-repository';

export const AlbumsRepositoryProvider: Provider = {
  provide: ALBUMS_REPOSITORY_TOKEN,
  useClass: FileSystemAlbumsRepository,
};
