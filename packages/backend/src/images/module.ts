import { Module } from '@nestjs/common';
import { UploadFilesUsecase } from './upload.use-case';
import { GetAllImagesUseCase } from './get-all-images.use-case';
import { ImageRepositoryProvider, UploadRepositoryProvider } from './provider';
import { ImagesController } from './images.controller';

@Module({
  providers: [
    ImageRepositoryProvider,
    UploadRepositoryProvider,
    UploadFilesUsecase,
    GetAllImagesUseCase,
    ImagesController,
  ],
  exports: [UploadFilesUsecase, GetAllImagesUseCase, ImagesController],
})
export class ImagesModule {}
