import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
