import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cinecalidad')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('inicio')
  prueba(@Response() respuesta) {
    return respuesta.render('inicio',
        {});
  }
}
