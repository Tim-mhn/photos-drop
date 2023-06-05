import { Module } from '@nestjs/common';
import { ImageRepositoryProvider } from './upload/provider';
import { UploadFilesUsecase } from './upload/upload.use-case';

@Module({
  providers: [ImageRepositoryProvider, UploadFilesUsecase],
  exports: [UploadFilesUsecase],
})
export class CoreModule {}
