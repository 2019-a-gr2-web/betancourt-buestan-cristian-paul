import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {JuegoModule} from "./piedra-papel-tijera/juego.module";

@Module({
  imports: [JuegoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
