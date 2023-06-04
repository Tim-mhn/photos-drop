import { Module } from '@nestjs/common';
import { ImageUploadController } from './image-upload/image-upload.controller';

@Module({
  imports: [],
  controllers: [ImageUploadController],
  providers: [],
})
export class AppModule {}
