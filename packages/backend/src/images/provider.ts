import { InjectionToken, Provider } from '@nestjs/common';
import { FileSystemUserImagesRepository } from './image.fs-repository';
import { FileSystemUploadRepository } from './upload.fs-repository';

export const IMAGE_REPOSITORY_TOKEN: InjectionToken = 'IMAGE_REPOSITORY';
export const UPLOAD_REPOSITORY_TOKEN: InjectionToken = 'UPLOAD_REPOSITORY';
export const ImageRepositoryProvider: Provider = {
  provide: IMAGE_REPOSITORY_TOKEN,
  useClass: FileSystemUserImagesRepository,
};

export const UploadRepositoryProvider: Provider = {
  provide: UPLOAD_REPOSITORY_TOKEN,
  useClass: FileSystemUploadRepository,
};
