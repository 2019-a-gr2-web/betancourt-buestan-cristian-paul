import {Controller, Get, Headers, Post, Body, Response, HttpCode, Query, Put, Res, Delete} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('suma')
  sumar(@Headers() headers,@Response() response){
    const numeroUno = Number(headers.numero1);
    const numeroDos = Number(headers.numero2);
    //console.log(`${numeroUno} ${numeroDos}`);
    if(numeroUno!=null && numeroDos!=null){
      const resultado= numeroUno + numeroDos;
      response.status(200).send({suma: `${resultado}`});
      }else{
      response.status(400).send({error: 'Parámetros a sumar incorrectos'})
    }
  }

  @Post('resta')
  restar(@Body()  body, @Response() response){
    const numeroUno = Number(body.numero1);
    const numeroDos = Number (body.numero2);
    //console.log(`${numeroUno} ${numeroDos}`);
    if(!isNaN(numeroUno) && !isNaN(numeroDos)){
      const resultado = numeroUno - numeroDos;
      response.set('resta', `${resultado}`);
      response.status(201).send({resta: `${resultado}`});
    }else{
      response.status(401).send({error: 'Parámetros a restar incorrectos'})
    }
  }

    @Put('multiplicacion')
    multiplicar(@Query() query, @Response() response){
      const numeroUno = Number(query.numero1);
      const numeroDos = Number (query.numero2);
      console.log(`${numeroUno} ${numeroDos}`);
      if(!isNaN(numeroUno) && !isNaN(numeroDos)){
        const resultado = numeroUno * numeroDos;
        response.status(202).send({multiplicacion: `${resultado}`});
      }else{
        response.status(402).send({error: 'Parámetros a multiplicar incorrectos'})
     }
    }

    @Delete('division')
    dividir(@Query() query, @Body()  body, @Response() response){
      const numeroUno = Number(body.numero1);
      const numeroDos = Number (query.numero2);
      console.log(`${numeroUno} ${numeroDos}`);
      if(!isNaN(numeroUno) && !isNaN(numeroDos) && numeroDos!=0){
        const resultado = numeroUno / numeroDos;
        response.status(203).send({division: `${resultado}`});
      }else{
        response.status(403).send({error: 'Parámetros a dividir incorrectos'})
      }
    }
}
