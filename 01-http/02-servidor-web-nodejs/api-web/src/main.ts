import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as express from 'express';
import * as session from 'express-session';
import * as favicon from 'serve-favicon';
import * as path from 'path';

var cookieParser = require('cookie-parser');

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    // app.use(favicon(path.join(__dirname, '..', 'publico', 'images', 'stark.ico')))
    app.use(cookieParser('Secreto'));
    // @ts-ignore
    app.set('view engine', 'ejs');
    app.use(express.static('publico'));
    const FileStore = require('session-file-store')(session);
    app.use(
        session({
            name: 'server-session-id',
            secret: 'No sera de tomar un traguito',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false
            },
            store: new FileStore()
        })
    );
    await app.listen(3000);
}

bootstrap();
