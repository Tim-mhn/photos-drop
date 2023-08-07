import { InjectionToken, Provider } from '@nestjs/common';
import { FileSystemUserImagesRepository } from './image.fs-repository';
import { FileSystemImagesRepository } from './upload.fs-repository';

export const USER_IMAGES_REPOSITORY_TOKEN: InjectionToken = 'IMAGE_REPOSITORY';
export const UPLOAD_REPOSITORY_TOKEN: InjectionToken = 'UPLOAD_REPOSITORY';
export const ImageRepositoryProvider: Provider = {
  provide: USER_IMAGES_REPOSITORY_TOKEN,
  useClass: FileSystemUserImagesRepository,
};

export const ImagesRepositoryProvider: Provider = {
  provide: UPLOAD_REPOSITORY_TOKEN,
  useClass: FileSystemImagesRepository,
};
