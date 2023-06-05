import { InjectionToken, Provider } from '@nestjs/common';
import { FileSystemImageRepository } from './image.fs-repository';

export const IMAGE_REPOSITORY_TOKEN: InjectionToken = 'IMAGE_REPOSITORY';

export const ImageRepositoryProvider: Provider = {
  provide: IMAGE_REPOSITORY_TOKEN,
  useClass: FileSystemImageRepository,
};
