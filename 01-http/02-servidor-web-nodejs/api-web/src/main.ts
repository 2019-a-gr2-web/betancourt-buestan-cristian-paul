import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as path from 'path';

var cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //.use(favicon(path.join(__dirname, '..','publico', 'imagenes','stark.ico')))
  app.use(cookieParser('Secreto'));
  // @ts-ignore
    app.set('view engine', 'ejs');
  app.use(express.static('publico'));
  await app.listen(3000);
}
bootstrap();
