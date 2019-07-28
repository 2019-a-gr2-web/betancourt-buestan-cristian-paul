import {Body, Controller, Get, Post, Response, Request, Query} from '@nestjs/common';
import {PedidoService} from "./pedido.service";
import {PacienteService} from "../paciente/paciente.service";
import {MedicamentoService} from "../medicamento/medicamento.service";
import {ElementoCarrito} from "./elementoCarrito";
import {Pedido} from "./pedido";

@Controller('pedido')
export class PedidoController {
    constructor(private readonly pedido: PedidoService,
                private readonly paciente: PacienteService,
                private readonly medicamento: MedicamentoService
    ) {

    }

    listaMedicamento = []
    valorTotal = 0
    impuesto = 0.12
    nombrePaciente = ""
    carrito = []
    pacienteId = -1

    @Get('validarUsuario')
    async validar(@Request() req, @Response() res, @Query('nombre') nombre: string) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        const listaPacientes = await this.paciente.obtenerPacientes()
        this.validarUsuario(res, nombre, listaPacientes)
        res.redirect('/pedido/compra')
    }

    @Get('compra')
    async crearCompra(@Request() req, @Response() res) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        const consulta = {
            where: [
                {
                    paciente: this.pacienteId
                }
            ]
        };
        this.listaMedicamento = await this.medicamento.obtenerMedicamentos(consulta)
        res.render('compra', {nombrePaciente: this.nombrePaciente, medicamentos: this.listaMedicamento})
    }

    @Post('agregarMedicamento')
    agregarMedicamento(@Request() req, @Response() res, @Body('cantidad') cantidad: number, @Body() elementoCarrito: ElementoCarrito) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        const existe = this.carrito.find((c: ElementoCarrito) => {
            return elementoCarrito.idMedicamento == c.idMedicamento
        })

        if (elementoCarrito.cantidad > 0) {
            if (existe) {
                this.carrito.map((c: ElementoCarrito) => {
                    if (c.idMedicamento == elementoCarrito.idMedicamento) {
                        c.cantidad = Number(c.cantidad) + Number(elementoCarrito.cantidad)
                    }
                })
            } else {
                this.carrito.push(elementoCarrito)
            }
            res.redirect('compra')
        }
    }

    @Post('desagregarMedicamento')
    desagregarMedicamento(@Request() req, @Response() res, @Body() elementoCarrito: ElementoCarrito) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        this.carrito = this.carrito.filter((c: ElementoCarrito) => {
            return c.idMedicamento != elementoCarrito.idMedicamento
        })
        res.redirect('/pedido/compra')
    }

    @Get('carrito')
    mostrarCarrito(@Response() res, @Request() req) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        res.render('carrito', {carrito: this.carrito, impuesto: this.impuesto})
    }

    @Get('confirmarCompra')
    confirmarCompra(@Response() res, @Request() req) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        res.render('confirmarCompra', {nombrePaciente: this.nombrePaciente})
    }

    @Post('ingresarCompra')
    async ingresarCompra(@Response() res, @Request() req, @Body() pedido: Pedido) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');

        let subtotal = 0
        this.carrito.forEach(c => {
            subtotal = subtotal + (Number(c.cantidad) * Number(c.precio))
        })
        pedido.estado = 'POR DESPACHAR'
        pedido.nombre = this.nombrePaciente
        pedido.subtotal = subtotal
        pedido.total = (Number(this.impuesto) + 1) * subtotal
        console.log(pedido)
        await this.pedido.insertarPedido(pedido)
        this.carrito = []
        res.redirect('/pedido/compra')
    }

    validarUsuario(@Response() res, nombre: string, listaPacientes) {
        const paciente = listaPacientes.find(pac => {
            return (nombre.trim().toUpperCase()) === (`${pac.nombres.trim().toUpperCase()} ${pac.apellidos.trim().toUpperCase()}`)
        })
        if (paciente) {
            this.pacienteId = paciente.id
            this.nombrePaciente = `${paciente.nombres.trim().toUpperCase()} ${paciente.apellidos.trim().toUpperCase()}`
        } else {
            res.redirect('/api/cerrar');
        }
    }

    @Get('lista')
    async listaPedidos(@Request() req, @Response() res) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        const listaPedidos = await this.pedido.obtenerPedidos()
        const pedidos = listaPedidos.filter(pedido => {
            return pedido.nombre === this.nombrePaciente
        })
        console.log(pedidos)
        res.render('pedidos', {pedidos: pedidos})
    }

    @Post('eliminar')
    async eliminarPedido(@Response() res, @Request() req, @Body('id') id: number) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'usuario');
        await this.pedido.eliminarPedido(id)
        res.redirect('/pedido/lista')
    }

    cookieUsuarioValida(@Response() res, tipoUsuario: string, tipoUsuarioV: string) {
        if (!tipoUsuario || tipoUsuario != tipoUsuarioV) {
            res.redirect('/api/cerrar');
        }
    }

}
