import { Module } from '@nestjs/common';
import { UploadFilesUseCase } from './upload.use-case';
import { GetAllImagesUseCase } from './get-all-images.use-case';
import { ImageRepositoryProvider, UploadRepositoryProvider } from './provider';
import { ImagesController } from './images.controller';
import { DownloadPhotosUseCase } from './download-photos.use-case';

@Module({
  providers: [
    ImageRepositoryProvider,
    UploadRepositoryProvider,
    UploadFilesUseCase,
    GetAllImagesUseCase,
    DownloadPhotosUseCase,
    ImagesController,
  ],
  exports: [
    UploadFilesUseCase,
    GetAllImagesUseCase,
    DownloadPhotosUseCase,
    ImagesController,
  ],
})
export class ImagesModule {}
