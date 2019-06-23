import {Body, Controller, Get, Param, Post, Put, Query, Request, Response} from '@nestjs/common';
import {AppService} from './app.service';
import {Cliente, Compras, Zapato} from "./interfaces/interfaces";

@Controller('shoes')
export class AppController {

    cons

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
    async listaClientes(@Response() res) {
        const arregloClientes = await this.__appService.obtenerClientes();
        res.render('lista-clientes', {arregloClientes: arregloClientes})
    }

    @Get('clientes/crear')
    crearCliente(@Response() res) {
        res.render('crear-cliente')
    }

    @Post('clientes/crear')
    async insertarCliente(@Body() cliente: Cliente, @Response() res) {
        cliente.nombre = cliente.nombre.toString()
        cliente.apellido = cliente.apellido.toString()
        cliente.cedula = cliente.cedula.toString()
        const resp = await this.__appService.insertarCliente(cliente)
        res.redirect('/shoes/clientes')
    }

    @Get('clientes/actualizar/:codigoCli')
    async actualizarCliente(@Response() res, @Param() par) {
        const codigoCli = par.codigoCli
        //const parametroBusqueda = `{where:{codigoCli:${codigoCli}}}`
        const arregloClientes = await this.__appService.obtenerClientes()
        res.render('actualizar-cliente', {arregloClientes: arregloClientes, codigoCli: codigoCli})
    }

    @Post('clientes/actualizar')
    async ejecutarCambioCliente(@Body('_method') metodo,
                                @Response() res,
                                @Body('codigoCli') codigoCli: string,
                                @Body('nombre') nombre?: string,
                                @Body('apellido') apellido?: string,
                                @Body('cedula') cedula?: string,
    ) {
        const cliente: Cliente = {} as Cliente
        cliente.codigoCli = Number(codigoCli)
        if (metodo == "DELETE") {
            await this.__appService.borrarCliente(cliente)
        } else {
            cliente.nombre = nombre
            cliente.apellido = apellido
            cliente.cedula = cedula
            await this.__appService.actualizarCliente(cliente)
        }
        res.redirect('/shoes/clientes')
    }

    ////COMPRAS///////////////////////////////////////////////////////////////////////////////////
    @Get('compras')
    async listaCompras(@Response() res) {
        const arregloZapatos = await this.__appService.obtenerZapatos();
        // const arregloClientes = await this.__appService.obtenerClientes();
        const arregloCompras = await this.__appService.obtenerCompras();

        res.render('lista-compras',
            {
                // arregloClientes: arregloClientes,
                arregloZapatos: arregloZapatos,
                arregloCompras: arregloCompras,
            }
        )
    }

    @Get('compras/crear')
    async crearCompra(@Response() res) {
        res.render('crear-compra',
        )
    }


    @Post('compras/crear')
    async insertarCompra(
        @Response() res,
        @Body() compra: Compras
    ) {
        compra.cantidad = Number(compra.cantidad)
        compra.comCliId = Number(compra.comCliId)
        compra.comZapId = Number(compra.comZapId)
        compra.fecha = new Date(compra.fecha)
        compra.validez = true
        const arregloZapatos = await this.__appService.obtenerZapatos();
        arregloZapatos.forEach(zapato => {
            if (zapato.codigoZap == compra.comZapId) {
                compra.total = zapato.precio * compra.cantidad
            }
        })
        console.log(`${compra.comCliId} ${compra.comZapId} ${compra.cantidad} ${compra.fecha} ${compra.validez} ${compra.total}`)
        const resp = await this.__appService.insertarCompra(compra)
        res.redirect('/shoes/compras/crear')
    }


    ////ZAPATOS///////////////////////////////////////////////////////////////////////////////////
    @Get('zapatos')
    async listaZapatos(@Response() res) {
        const arregloZapatos = await this.__appService.obtenerZapatos();
        res.render('lista-zapatos', {arregloZapatos: arregloZapatos})
    }

    @Get('zapatos/crear')
    crearZapato(@Response() res) {
        res.render('crear-zapato')
    }

    @Post('zapatos/crear')
    async insertarZapato(@Body() zapato: Zapato, @Response() res) {
        zapato.marca = zapato.marca.toString()
        zapato.color = zapato.color.toString()
        zapato.talla = Number(zapato.talla)
        zapato.cantidad = Number(zapato.cantidad)
        zapato.precio = Number(zapato.precio)
        zapato.tipo = zapato.tipo.toString()
        await this.__appService.insertarZapato(zapato)
        res.redirect('/shoes/zapatos')
    }

    @Get('zapatos/actualizar/:codigoZap')
    async actualizarZapato(@Param() par, @Response() res) {
        const codigoZap = par.codigoZap
        const arregloZapatos = await this.__appService.obtenerZapatos()
        res.render('actualizar-zapato', {arregloZapatos: arregloZapatos, codigoZap: codigoZap})
    }

    @Post('zapatos/actualizar')
    async ejecutarCambioZapato(@Body('_method') metodo,
                               @Response() res,
                               @Body('codigoZap') codigoZap: string,
                               @Body('talla') talla?: string,
                               @Body('tipo') tipo?: string,
                               @Body('color') color?: string,
                               @Body('precio') precio?: string,
                               @Body('cantidad') cantidad?: string,
                               @Body('marca') marca?: string
    ) {

        const zapato: Zapato = {} as Zapato
        zapato.codigoZap = Number(codigoZap)
        if (metodo == "DELETE") {
            await this.__appService.borrarZapato(zapato)
        } else {
            zapato.codigoZap = Number(codigoZap)
            zapato.talla = Number(talla)
            zapato.marca = marca
            zapato.color = color
            zapato.cantidad = Number(cantidad)
            zapato.precio = Number(precio)
            zapato.tipo = tipo
            await this.__appService.actualizarZapato(zapato)
        }
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

