import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use('/image', express.static('image'));
  app.use('/files', express.static('files'));
  app.use('/videos', express.static('videos'));
  app.use('/user_photo', express.static('user_photo'));
  app.enableCors();
  const port = process.env.PORT;
  await app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
  });
}
bootstrap();
