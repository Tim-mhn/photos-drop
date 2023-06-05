import { Module } from '@nestjs/common';
import { ImageUploadController } from './image-upload/image-upload.controller';
import { CoreModule } from '../libs/core/src/core.module';

@Module({
  imports: [CoreModule],
  controllers: [ImageUploadController],
  providers: [],
})
export class AppModule {}
