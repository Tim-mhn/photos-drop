import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ImagesModule } from './images/module';
import { ImagesController } from './images/images.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { isAuthMiddleware } from './auth';
import { AlbumsModule } from './albums/module';
import { AlbumsController } from './albums/albums.controller';
import { AlbumPhotosModule } from './album-photos/module';

const rootPath = join(__dirname, '..', 'images');
@Module({
  imports: [
    ImagesModule,
    AlbumsModule,
    AlbumPhotosModule,
    ServeStaticModule.forRoot({
      rootPath: rootPath,
    }),
  ],
  controllers: [ImagesController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAuthMiddleware).forRoutes(ImagesController);
    consumer.apply(isAuthMiddleware).forRoutes(AlbumsController);
  }
}
