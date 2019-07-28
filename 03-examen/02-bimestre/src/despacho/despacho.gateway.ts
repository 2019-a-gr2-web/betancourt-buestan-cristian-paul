import {WebSocketGateway, WebSocketServer, SubscribeMessage} from '@nestjs/websockets'
import {Client} from "socket.io";
import {PedidoService} from "../cabecera/pedido.service";
import {Like} from "typeorm";
import {Pedido} from "../cabecera/pedido";

// ws://localhost:3001/websockets
@WebSocketGateway(
    3001,   //puerto
    {
        namespace: '/websockets' //url
    }
)
export class DespachoGateway {

    @WebSocketServer() server;

    constructor(private readonly pedido: PedidoService) {

    }


    @SubscribeMessage('peticion')
    async preparacion(client: Client | any, data: any) {
        const consulta = {
            where: [
                {
                    estado: Like(`POR DESPACHAR`),
                }
            ]
        };
        const pedidos = await this.pedido.obtenerPedidos(consulta)
        client.broadcast.emit('pedido', {pedidos: pedidos})
        return pedidos
    }

    @SubscribeMessage('despachar')
    async despachar(client: Client | any, data: any) {
        let pedido: Pedido;
        pedido = {
            id: Number(data.id),
            nombre: '',
            direccion: '',
            telefono: '',
            cedula: '',
            estado: 'DESPACHADO',
            subtotal: 0,
            total: 0
        };
        this.pedido.despacharPedido(pedido)
        const consulta = {
            where: [
                {
                    estado: Like(`POR DESPACHAR`),
                }
            ]
        };
        const pedidos = await this.pedido.obtenerPedidos(consulta)
        client.broadcast.emit('pedido', {pedidos: pedidos})
        return pedidos
    }

    @SubscribeMessage('respuesta')
    validarRespuesta(client: Client | any, data: any) {

    }

}
