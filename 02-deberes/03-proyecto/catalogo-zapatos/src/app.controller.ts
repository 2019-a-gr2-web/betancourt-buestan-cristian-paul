import {Body, Controller, Get, Param, Post, Query, Request, Response} from '@nestjs/common';
import {AppService} from './app.service';

//import {Aplicacion, SistemaOperativo} from "./interfaces/interfaces";


@Controller('shoes')
export class AppController {

    constructor(private readonly __appService: AppService) {
    }

    @Get('login')
    login(@Response() res) {
        res.render('login')
    }

    @Post('usuario')
    usuario(@Body('usuario') usuario: String, @Response() res) {
        res.cookie(
            'usuario',      //nombre
            usuario,               //valor
            {                                   //opciones
                signed: true
            }).redirect('/api/inicio');

    }

    @Get('clientes')
    listaClientes(@Response() res) {
        const listaClientes: string[] = []
        res.render('lista-clientes', {listaClientes: listaClientes})
    }

    @Get('clientes/crear')
    crearCliente(@Response() res) {
        res.render('crear-cliente')
    }

    @Get('compras')
    listaCompras(@Response() res) {
        const listaClientes: string[] = []
        res.render('lista-compras', {listaClientes: listaClientes})
    }

    @Get('compras/crear')
    crearCompra(@Response() res) {
        res.render('crear-compra')
    }

    @Get('zapatos')
    listaZapatos(@Response() res) {
        const listaClientes: string[] = []
        res.render('lista-zapatos', {listaClientes: listaClientes})
    }

    @Get('zapatos/crear')
    crearZapato(@Response() res) {
        res.render('crear-zapato')
    }

    @Get('inicio')
    inicio(@Response() res) {
        res.render('inicio', {})
    }

    cookieValida(@Response() res, usuario: string) {
        if (!usuario) {
            res.redirect('/api/cerrar');
        }
    }
}

