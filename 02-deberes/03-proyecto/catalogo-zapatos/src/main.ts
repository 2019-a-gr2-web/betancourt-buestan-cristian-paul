import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
//import * as cookieParser from 'cookie-parser';
var cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('examen'));
  // @ts-ignore
  app.set('view engine', 'ejs');
  await app.listen(3000);
}
bootstrap();
