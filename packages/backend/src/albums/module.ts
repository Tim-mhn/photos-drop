import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsRepositoryProvider } from './providers';
import { GetUserAlbumsUseCase } from './get-user-albums.use-case';
import { CreateAlbumUseCase } from './create-album.use-case';
import { AlbumPhotosModule } from '../album-photos/module';

@Module({
  imports: [AlbumPhotosModule],
  controllers: [AlbumsController],
  providers: [
    AlbumsController,
    AlbumsRepositoryProvider,
    GetUserAlbumsUseCase,
    CreateAlbumUseCase,
  ],
  exports: [AlbumsController],
})
export class AlbumsModule {}
