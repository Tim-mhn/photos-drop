import { Module } from '@nestjs/common';
import { UploadFilesUseCase } from './upload.use-case';
import { GetAllImagesUseCase } from './get-all-images.use-case';
import { ImageRepositoryProvider, ImagesRepositoryProvider } from './provider';
import { ImagesController } from './images.controller';
import { DownloadPhotosUseCase } from './download-photos.use-case';
import { ImagesService } from './images.service';

@Module({
  providers: [
    ImageRepositoryProvider,
    ImagesRepositoryProvider,
    UploadFilesUseCase,
    GetAllImagesUseCase,
    DownloadPhotosUseCase,
    ImagesController,
    ImagesService,
  ],
  exports: [
    UploadFilesUseCase,
    GetAllImagesUseCase,
    DownloadPhotosUseCase,
    ImagesController,
    ImagesService,
  ],
})
export class ImagesModule {}
