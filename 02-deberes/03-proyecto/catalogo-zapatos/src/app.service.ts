import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ClienteEntity} from "./cliente.entity";
import {ZapatoEntity} from "./zapato.entity";
import {ComprasEntity} from "./compras.entity";
import {Cliente, Compras, Zapato} from "./interfaces/interfaces";

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(ClienteEntity)
        private readonly _clienteRepository: Repository<ClienteEntity>,
        @InjectRepository(ZapatoEntity)
        private readonly _zapatoRepository: Repository<ZapatoEntity>,
        @InjectRepository(ComprasEntity)
        private readonly _comprasRepository: Repository<ComprasEntity>) {

    }

    //CLIENTE//////////////////////////////
    insertarCliente(cliente: Cliente): Promise<ClienteEntity> {
        const objetoEntidad = this._clienteRepository
            .create(cliente)
        return this._clienteRepository.save(objetoEntidad)
    }

    obtenerClientes(parametrosBusqueda?): Promise<ClienteEntity[]> {
        return this._clienteRepository.find(parametrosBusqueda)
    }

    actualizarCliente(cliente: Cliente) {
        return this._clienteRepository.createQueryBuilder()
            .update(cliente)
            .set({nombre: `${cliente.nombre}`, apellido: `${cliente.apellido}`, cedula: `${cliente.cedula}`})
            .where("codigoCli = :id", {id: cliente.codigoCli})
            .execute();
    }

    borrarCliente(cliente: Cliente) {
        return this._clienteRepository
            .createQueryBuilder()
            .delete()
            .from('cliente')
            .where("codigoCli = :id", {id: cliente.codigoCli})
            .execute();
    }

    //ZAPATOS/////////////////////////////
    insertarZapato(zapato: Zapato): Promise<ZapatoEntity> {
        const objetoEntidad = this._zapatoRepository
            .create(zapato)
        return this._zapatoRepository.save(objetoEntidad)
    }

    obtenerZapatos(parametrosBusqueda?): Promise<ZapatoEntity[]> {
        return this._zapatoRepository.find(parametrosBusqueda)
    }

    actualizarZapato(zapato: Zapato) {
        return this._zapatoRepository.createQueryBuilder()
            .update(zapato)
            .set({
                    codigoZap: zapato.codigoZap,
                    talla: zapato.talla,
                    tipo: `${zapato.tipo}`,
                    color: `${zapato.color}`,
                    precio: zapato.precio,
                    cantidad: zapato.cantidad,
                    marca: `${zapato.marca}`
                }
            )
            .where(
                "codigoZap = :id"
                , {
                    id: zapato.codigoZap
                }
            )
            .execute();
    }

    borrarZapato(zapato: Zapato) {
        return this._zapatoRepository
            .createQueryBuilder()
            .delete()
            .from('zapato')
            .where("codigoZap = :id", {id: zapato.codigoZap})
            .execute();
    }

//COMPRA/////////////////////////////

    obtenerCompras(parametrosBusqueda?): Promise<ComprasEntity[]> {
        return this._comprasRepository.find(parametrosBusqueda)
    }

    insertarCompra(compra: Compras): Promise<ComprasEntity> {
        const objetoEntidad = this._comprasRepository
            .create(compra)
        return this._comprasRepository.save(objetoEntidad)
    }

    actualizarCompra(compra: Compras) {
        return this._comprasRepository.createQueryBuilder()
            .update(compra)
            .set({
                    validez: false
                }
            )
            .where(
                "codigoCom = :id"
                , {
                    id: compra.codigoCom
                }
            )
            .execute();
    }
}
