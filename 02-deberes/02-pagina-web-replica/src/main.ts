import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as express from "express";
import * as favicon from "serve-favicon";
import * as path from "path";

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    // app.use(favicon(__dirname + '/public/images/favicon.ico'));
    // @ts-ignore
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    //app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
    await app.listen(3000);
}

bootstrap();
