import { Module } from '@nestjs/common';
import { UploadFilesUsecase } from './images/upload.use-case';
import { GetAllImagesUseCase } from './images/get-all-images.use-case';
import { ImageRepositoryProvider } from './images/provider';

@Module({
  providers: [ImageRepositoryProvider, UploadFilesUsecase, GetAllImagesUseCase],
  exports: [UploadFilesUsecase, GetAllImagesUseCase],
})
export class CoreModule {}
