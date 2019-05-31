import {Body, Controller, Get, Param, Post, Query, Request, Response} from '@nestjs/common';
import {AppService} from './app.service';
import {Aplicacion, SistemaOperativo} from "./interfaces/interfaces";

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
    sistemaOperativo(@Request() req, @Response() res, @Query('nombre') nombre?: string) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        let arregloSO;
        if (nombre) {
            arregloSO = this.__appService.buscarPorNombreSO(nombre);
        } else {
            arregloSO = this.__appService.sistemasOperativos;
        }
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

    @Get('sistemaOperativo/crear')
    enviarCrearSO(@Request() req, @Response() res) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        res.render('crear-so', {usuario: usuario});
    }

    @Post('sistemaOperativo/crear')
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

    @Post('sistemaOperativo/eliminar')
    eliminarTrago(@Request() req, @Response() res,
                  @Body('idSO') idSO: number) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        this.__appService.eliminarSO(idSO);
        res.redirect('/api/sistemaOperativo');
    }

    @Get('sistemaOperativo/gestion/:idSO')
    aplicacion(@Request() req, @Response() res, @Param() param, @Query('nombre') nombre?: string) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        let arregloApp;
        const idSO: number = param.idSO;
        if (nombre) {
            arregloApp = this.__appService.buscarPorNombreApp(nombre, idSO);
        } else {
            arregloApp = this.__appService.buscarApp(idSO);
        }
        res.render('lista-app', {usuario: usuario, idSO: idSO, arregloApp: arregloApp});
    }

    @Post('sistemaOperativo/gestion/crear')
    enviarCrearApp(@Request() req, @Response() res, @Body('idSO') idSO: string) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        res.render('crear-app', {usuario: usuario, idSO: idSO});

    }

    @Post('sistemaOperativo/gestion/insertar')
    insertarDatosApp(@Request() req, @Response() res, @Body() app: Aplicacion) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        app.sistemaOperativoId = Number(app.sistemaOperativoId);
        app.version = Number(app.version);
        app.fechaLanzamiento = new Date(app.fechaLanzamiento);
        app.costo = Number(app.costo);
        app.pesoEnGigas = Number(app.pesoEnGigas);
        this.__appService.insertarApp(app);
        res.redirect('/api/sistemaOperativo/gestion/' + app.sistemaOperativoId)
    }

    @Post('sistemaoperativo/gestion/eliminar')
    eliminarApp(@Request() req, @Response() res, @Body('id') idApp: string, @Body('idSO') idSO: string) {
        const usuario = req.signedCookies.usuario;
        this.cookieValida(res, usuario);
        this.__appService.eliminarApp(Number(idApp));
        res.redirect('/api/sistemaOperativo/gestion/' + idSO);
    }

    cookieValida(@Response() res, usuario: string) {
        if (!usuario) {
            res.redirect('/api/cerrar');
        }
    }
}
