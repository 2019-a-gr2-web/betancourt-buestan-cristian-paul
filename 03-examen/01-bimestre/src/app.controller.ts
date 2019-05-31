import {Body, Controller, Get, Post, Request, Response} from '@nestjs/common';
import {AppService} from './app.service';
import {SistemaOperativo} from "./interfaces/interfaces";

// @ts-ignore
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
        this.cookieValida(res, usuario);
        let arregloSO;
        arregloSO = this.__appService.sistemasOperativos;

        res.render('lista-so', {
            usuario: usuario,
            arregloSO: arregloSO
        });
    }

    @Get('cerrar')
    cerrarSesion(@Request() req, @Response() res) {
        res.clearCookie('usuario');
        res.redirect('/api/inicio');
    }

    @Get('crearSO')
    enviarCrearSO(@Request() req, @Response() res) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        res.render('crear-so');
    }

    @Post('crearSO')
    crearSO(@Request() req, @Response() res, @Body() body: SistemaOperativo) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        body.versionApi = Number(body.versionApi);
        body.fechaLanzamiento = new Date(body.fechaLanzamiento);
        body.pesoEnGigas = Number(body.pesoEnGigas);
        body.instalado = Boolean(body.instalado);
        this.__appService.insertarSO(body);
        res.redirect('/api/sistemaOperativo')
    }

    @Post('eliminar')
    eliminarTrago(@Request() req, @Response() res,
                  @Body('idSO') idSO: number) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        this.__appService.eliminarSO(idSO);
        res.redirect('/api/sistemaOperativo');
    }

    cookieValida(@Response() res, usuario: string) {
        if (!usuario) {
            res.redirect('/api/cerrar');
        }
    }
}
