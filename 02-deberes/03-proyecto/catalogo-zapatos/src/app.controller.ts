import {Body, Controller, Get, Param, Post, Query, Request, Response} from '@nestjs/common';
import {AppService} from './app.service';
import {Cliente, Zapato} from "./interfaces/interfaces";

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

    ////CLIENTES///////////////////////////////////////////////////////////////////////////////////
    @Get('clientes')
    listaClientes(@Response() res) {
        //leer lista de clientes del servicio
        const listaClientes: string[] = []
        res.render('lista-clientes', {listaClientes: listaClientes})
    }

    @Get('clientes/crear')
    crearCliente(@Response() res) {
        res.render('crear-cliente')
    }

    @Post('clientes/crear')
    insertarCliente(@Body() cliente: Cliente, @Response() res) {
        cliente.nombre = cliente.nombre.toString()
        cliente.apellido = cliente.nombre.toString()
        cliente.cedula = cliente.cedula.toString()
        console.log(`${cliente.nombre} ${cliente.apellido} ${cliente.cedula}`)
        //llamar al servicio que inserte a la base de datos
        res.redirect('/shoes/clientes')
    }

    @Post('clientes/borrar')
    eliminarCliente(@Response()res, @Body() cliente: Cliente) {
        console.log(cliente.codigoCli.toString())
        res.redirect('/shoes/clientes')
    }

    @Get('clientes/actualizar/:idCli')
    actualizarCliente(@Response() res, @Param() par) {
        const idCli = par.idCli
        //buscar cliente y enviar en JSON
        res.render('actualizar-cliente', {idCli: idCli})
    }

    ////COMPRAS///////////////////////////////////////////////////////////////////////////////////
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

    ////ZAPATOS///////////////////////////////////////////////////////////////////////////////////
    @Get('zapatos/crear')
    crearZapato(@Response() res) {
        res.render('crear-zapato')
    }

    @Post('zapatos/crear')
    insertarZapato(@Body() zapato: Zapato, @Response() res) {
        zapato.marca = zapato.marca.toString()
        zapato.color = zapato.color.toString()
        zapato.talla = Number(zapato.talla)
        zapato.cantidad = Number(zapato.cantidad)
        zapato.precio = Number(zapato.precio)
        zapato.tipo = zapato.tipo.toString()
// añadir a la base de datos
        console.log(`${zapato.marca} ${zapato.color} ${zapato.talla} ${zapato.cantidad} ${zapato.precio} ${zapato.tipo}`)
        res.redirect('/shoes/zapatos')
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

