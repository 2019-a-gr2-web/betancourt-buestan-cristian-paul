import { Repository } from "typeorm";
import { PedidoEntity } from "./pedido.entity";
import { Pedido } from "./pedido";
export declare class PedidoService {
    private readonly _pedidoRepository;
    constructor(_pedidoRepository: Repository<PedidoEntity>);
    insertarPedido(pedido: Pedido): void;
    obtenerPedidos(parametrosBusqueda?: any): Promise<PedidoEntity[]>;
    eliminarPedido(idPedido: number): Promise<import("typeorm").DeleteResult>;
}
