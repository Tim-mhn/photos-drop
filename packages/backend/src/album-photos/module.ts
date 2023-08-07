import { Module } from '@nestjs/common';
import { AlbumPhotosService } from './add-photos-to-album.use-case';
import { AlbumPhotosRepositoryProvider } from './providers';
import { AlbumPhotosController } from './album-photos.controller';
import { ImagesModule } from '../images/module';
import { AlbumsModule } from '../albums/module';

@Module({
  imports: [ImagesModule, AlbumsModule],
  providers: [
    AlbumPhotosController,
    AlbumPhotosService,
    AlbumPhotosRepositoryProvider,
  ],
  controllers: [AlbumPhotosController],
  exports: [AlbumPhotosController],
})
export class AlbumPhotosModule {}
