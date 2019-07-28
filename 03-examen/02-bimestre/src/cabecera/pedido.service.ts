import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PedidoEntity} from "./pedido.entity";
import {Pedido} from "./pedido";
import {MedicamentoEntity} from "../medicamento/medicamento.entity";
import {Medicamento} from "../medicamento/medicamento";

@Injectable()
export class PedidoService {

    constructor(@InjectRepository(PedidoEntity)
                private readonly _pedidoRepository: Repository<PedidoEntity>) {

    }

    insertarPedido(pedido: Pedido) {
        const objetoEntidad = this._pedidoRepository
            .create(pedido)
        this._pedidoRepository.save(objetoEntidad)
    }

    obtenerPedidos(parametrosBusqueda?): Promise<PedidoEntity[]> {
        return this._pedidoRepository.find(parametrosBusqueda)
    }

    eliminarPedido(idPedido: number) {
        return this._pedidoRepository
            .createQueryBuilder()
            .delete()
            .from('pedido')
            .where("id = :id", {id: idPedido})
            .execute();
    }

    despacharPedido(pedido: Pedido) {
        return this._pedidoRepository.createQueryBuilder()
            .update(pedido)
            .set({
                estado: 'DESPACHADO'
            })
            .where("id = :id", {id: pedido.id})
            .execute();
    }
}
