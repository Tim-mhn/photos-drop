import { Module } from '@nestjs/common';
import { ImageRepositoryProvider } from './images/provider';
import { UploadFilesUsecase } from './images/upload.use-case';
import { GetAllImagesUseCase } from './images/get-all-images.use-case';

@Module({
  providers: [ImageRepositoryProvider, UploadFilesUsecase, GetAllImagesUseCase],
  exports: [UploadFilesUsecase, GetAllImagesUseCase],
})
export class CoreModule {}
