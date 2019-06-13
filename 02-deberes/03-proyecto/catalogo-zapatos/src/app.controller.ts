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
        res.render('lista-clientes')
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
        const resp = this.__appService.insertarCliente(cliente)
        console.log(resp)
        //llamar al servicio que inserte a la base de datos
        res.redirect('/shoes/clientes')
    }

    @Post('clientes/borrar')
    eliminarCliente(@Response()res, @Body() cliente: Cliente) {
        console.log(cliente.codigoCli.toString())
        res.redirect('/shoes/clientes')
    }

    @Get('clientes/actualizar/:codigoCli')
    actualizarCliente(@Response() res, @Param() par) {
        const codigoCli = par.codigoCli
        //buscar cliente y enviar en JSON
        res.render('actualizar-cliente', {codigoCli: codigoCli})
    }

    @Post('clientes/actualizar')
    ejecutarActualizarCliente(@Body() cliente: Cliente, @Response() res) {
        console.log(`${cliente.codigoCli} ${cliente.nombre} ${cliente.apellido}`)
        res.redirect('/shoes/clientes')
    }

    ////COMPRAS///////////////////////////////////////////////////////////////////////////////////
    @Get('compras')
    listaCompras(@Response() res) {
        const listaClientes: Cliente[] = []
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
        console.log(this.__appService.insertarZapato(zapato))
        res.redirect('/shoes/zapatos')
    }

    @Get('zapatos/actualizar/:codigoZap')
    actualizarZapato(@Param() param, @Response() res) {
        //obtener por id el zapato completo
        //enviar el zapato
        const codigoZap = param.codigoZap
        res.render('actualizar-zapato', {codigoZap: codigoZap})
    }

    @Post('zapatos/actualizar')
    ejecutarActualizarZapato(@Body() zapato: Zapato, @Response() res) {
        console.log(`${zapato.codigoZap} ${zapato.talla} ${zapato.tipo} ${zapato.color} ${zapato.precio} ${zapato.cantidad} ${zapato.marca}`)
        res.redirect('/shoes/zapatos')
    }

    @Post('zapatos/borrar')
    eliminarZapato(@Response()res, @Body() zapato: Zapato) {
        console.log(zapato.codigoZap.toString())
        console.log(`${zapato.codigoZap}`)
        res.redirect('/shoes/zapatos')
    }

    /////////////////////////////////////////////////////////////

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

