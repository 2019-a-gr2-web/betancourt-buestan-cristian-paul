import {Controller, Get, Headers, Post, Body, Response, Request, Query, Put, Delete} from '@nestjs/common';
import {AppService} from './app.service';
import * as Joi from '@hapi/joi';

@Controller('calculadora')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('sesion')
    iniciarSesion(@Request() request, @Response() response, @Query() query,) {
        const usuario = query.usuario;
        if (usuario) {
            response.cookie(
                'USER',      //nombre
                usuario,               //valor
                {                                   //opciones
                    signed: true
                }
            ).cookie(
                'POINTS',
                100,
                {
                    //pires: new Date().setFullYear(2021,1,1),
                    signed: true
                }
            ).send({
                usuario: usuario,
                puntaje: 100,
                mensaje: 'YA PUEDE COMENZAR EL JUEGO'
            });
        } else {
            response.send('INGRESE EL NOMBRE DE USUARIO');
        }
    }

    @Get('suma')
    sumar(@Headers() headers, @Request()request, @Response() response) {
        if (this.cookiesValidas(request, response)) {
            if (this.numerosValidos(response, headers.numero1, headers.numero2)) {
                const numeroUno = Number(headers.numero1);
                const numeroDos = Number(headers.numero2);
                const resultado = numeroUno + numeroDos;
                this.valorPuntaje(response, request.signedCookies.USER, request.signedCookies.POINTS, resultado, 200);
            }
        }
    }

    @Post('resta')
    restar(@Request() request, @Body() body, @Response() response) {
        if (this.cookiesValidas(request, response)) {
            if (this.numerosValidos(response, body.numero1, body.numero2)) {
                const numeroUno = Number(body.numero1);
                const numeroDos = Number(body.numero2);
                const resultado = numeroUno - numeroDos;
                this.valorPuntaje(response, request.signedCookies.USER, request.signedCookies.POINTS, resultado, 300);
            }
        }
    }

    @Put('multiplicacion')
    multiplicar(@Request() request, @Query() query, @Response() response) {
        if (this.cookiesValidas(request, response)) {
            if (this.numerosValidos(response, query.numero1, query.numero2)) {
                const numeroUno = Number(query.numero1);
                const numeroDos = Number(query.numero2);
                const resultado = numeroUno * numeroDos;
                this.valorPuntaje(response, request.signedCookies.USER, request.signedCookies.POINTS, resultado, 400);
            }
        }
    }

    @Delete('division')
    dividir(@Request() request, @Query() query, @Body()  body, @Response() response) {
        if (this.cookiesValidas(request, response)) {
            if (this.numerosValidos(response, body.numero1, query.numero2)) {
                const numeroUno = Number(body.numero1);
                const numeroDos = Number(query.numero2);
                if (numeroDos == 0) {
                    response.send({
                        error: 'DIVISOR(numero2) NO PUEDE SER IGUAL A 0'
                    });
                } else {
                    const resultado = numeroUno / numeroDos;
                    this.valorPuntaje(response, request.signedCookies.USER, request.signedCookies.POINTS, resultado, 500);
                }
            }
        }

    }

    valorPuntaje(@Response() response, usuario: string, puntaje: number, resultado: number, status: number): void {
        const resultadoPuntaje = puntaje - resultado;
        if (resultadoPuntaje > 0) {
            this.respuesta(response, usuario, resultadoPuntaje, status, false);
        } else {
            this.respuesta(response, usuario, resultadoPuntaje, status + 200, true);
        }
    }

    cookiesValidas(@Request() request, @Response() response): boolean {
        try {
            const usuario = request.signedCookies.USER;
            const puntaje = request.signedCookies.POINTS;
            if (!(usuario && puntaje)) {
                response.status(401).send(
                    {
                        error: 'INICIE SESIÓN'
                    }
                );
                return false
            }
        } catch (e) {
            return false;
        }
        return true;
    }

    numerosValidos(@Response() response, numeroUno: any, numeroDos: any): boolean {
        if (numeroUno && numeroDos) {
            const esquemaValidacionNumero = Joi.object().keys({
                numero: Joi.number().integer().required()
            });

            let objetoValidacion = {numero: numeroUno};
            const resultado1 = Joi.validate(objetoValidacion, esquemaValidacionNumero);
            objetoValidacion = {numero: numeroDos};
            const resultado2 = Joi.validate(objetoValidacion, esquemaValidacionNumero);

            if (resultado1.error || resultado2.error) {
                response.send({error: 'ERROR AL INGRESAR LOS NÚMEROS'});
                return false;
            }

            return true;
        }
        return false;
    }

    respuesta(@Response() response, usuario: string, puntaje: number, status: number, fin: boolean) {
        if (!fin) {
            response.status(status)
                .cookie('POINTS', puntaje, {signed: true})
                .send({
                    usuario: usuario,
                    puntaje: puntaje
                });
        } else {
            response.clearCookie('USER').clearCookie('POINTS').send({
                usuario: usuario,
                puntaje: 0,
                mensaje: 'SE LE TERMINARON SUS PUNTOS'
            }).status(status);
        }
    }
}
