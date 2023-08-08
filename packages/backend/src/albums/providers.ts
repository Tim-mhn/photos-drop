import { Provider } from '@nestjs/common';
import { FileSystemV2AlbumsRepository } from './persistence/albums.fs-2-repository';

export const ALBUMS_REPOSITORY_TOKEN = 'albums-repository';

export const AlbumsRepositoryProvider: Provider = {
  provide: ALBUMS_REPOSITORY_TOKEN,
  useClass: FileSystemV2AlbumsRepository,
};
