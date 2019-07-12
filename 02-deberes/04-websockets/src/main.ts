import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('public'));
  // @ts-ignore
  app.set('view engine', 'ejs');
  await app.listen(3000);
}
bootstrap();
