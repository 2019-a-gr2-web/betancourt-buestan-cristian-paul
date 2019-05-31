import {Body, Controller, Get, Post, Request, Response} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('api')
export class AppController {
    constructor(private readonly __appService: AppService) {
    }

    @Get('inicio')
    inicio(@Response() res) {
        res.render('login')
    }

    @Post('usuario')
    usuario(@Body('usuario') usuario: String, @Response() res) {
        res.cookie(
            'usuario',      //nombre
            usuario,               //valor
            {                                   //opciones
                signed: true
            }).redirect('/api/sistemaOperativo');

    }

    @Get('sistemaOperativo')
    sistemaOperativo(@Request() req, @Response() res) {
        const usuario = req.signedCookies.usuario;
        if (this.cookieValida(usuario)) {
            console.log(usuario);
            let arregloSO;

            arregloSO = this.__appService.sistemasOperativos;

            res.render('lista-so', {
                usuario: usuario,
                arregloSO: arregloSO
            });
        } else {
            res.redirect('/api/cerrar');
        }
    }

    @Get('cerrar')
    cerrarSesion(@Request() req, @Response() res) {
        res.clearCookie('usuario');
        res.redirect('/api/inicio');
    }

    @Get('crearSO')
    enviarCrearSO(@Request() req, @Response() res) {
        res.render('crear-so');
    }

    @Post('crearSO')
    crearSO() {


    }

    cookieValida(usuario: string): boolean {
        return !!usuario;
    }
}
