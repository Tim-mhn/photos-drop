import { Module } from '@nestjs/common';
import { AlbumPhotosService } from './add-photos-to-album.use-case';
import { AlbumPhotosRepositoryProvider } from './providers';
import { AlbumPhotosController } from './album-photos.controller';
import { ImagesModule } from '../images/module';

@Module({
  imports: [ImagesModule],
  providers: [
    AlbumPhotosController,
    AlbumPhotosService,
    AlbumPhotosRepositoryProvider,
  ],
  controllers: [AlbumPhotosController],
  exports: [AlbumPhotosController],
})
export class AlbumPhotosModule {}
