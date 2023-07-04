import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Origin'],
    exposedHeaders: ['Content-Disposition'],
  });
  await app.listen(8000);
}
bootstrap();
