import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    console.log(__dirname + 'public')
    // app.use(express.static('public'));
    app.use(express.static(__dirname + '/public'));
    // @ts-ignore
    app.set('view engine', 'ejs');
    await app.listen(3000);
}

bootstrap();
