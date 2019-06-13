import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ClienteEntity} from "./cliente.entity";
import {ZapatoEntity} from "./zapato.entity";
import {ComprasEntity} from "./compras.entity";
import {Cliente, Zapato} from "./interfaces/interfaces";
import {promises} from "fs";

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
    insertarCliente(cliente: Cliente) {
        this._clienteRepository.save(this._clienteRepository.create(cliente))
            .then(datos => {
                return `Cliente creado exitosamente`
            }).catch(
            error => {
                return `Error: ${error}`
            }
        )
    }

    obtenerClientes() {
        return this._clienteRepository.find(
            {order: {codigoCli: "DESC"}}
        )[0] as Cliente[]
    }

    //ZAPATOS/////////////////////////////
    insertarZapato(zapato: Zapato) {
        this._zapatoRepository.save(this._zapatoRepository.create(zapato))
            .then(datos => {
                return `Cliente creado exitosamente`
            }).catch(
            error => {
                return `Error: ${error}`
            }
        )
    }

    //COMPRA/////////////////////////////
}
