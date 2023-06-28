import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoreModule } from '../libs/core/src/core.module';
import { ImagesController } from './images/images.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { isAuthMiddleware } from './auth.middleware';

const rootPath = join(__dirname, '..', 'images');
@Module({
  imports: [
    CoreModule,
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
  }
}
