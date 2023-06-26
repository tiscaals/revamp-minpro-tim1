
import "dotenv/config"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common/pipes";
import * as bodyParser from 'body-parser';
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT

  app.enableCors()

  app.use('/image', express.static('images/job_photo'));

  // For User, curriculum
  app.use('/images', express.static('images'));
  app.use('/profile', express.static('images/profile'));
  app.use('/files', express.static('files'));
  // End
  
  // curriculum
  app.use('/videos', express.static('videos'));

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
  });
}
bootstrap();
