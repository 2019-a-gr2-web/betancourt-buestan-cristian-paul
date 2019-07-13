import { Repository } from "typeorm";
import { ClienteEntity } from "./cliente.entity";
import { ZapatoEntity } from "./zapato.entity";
import { ComprasEntity } from "./compras.entity";
import { Cliente, Zapato } from "./interfaces/interfaces";
export declare class AppService {
    private readonly _clienteRepository;
    private readonly _zapatoRepository;
    private readonly _comprasRepository;
    constructor(_clienteRepository: Repository<ClienteEntity>, _zapatoRepository: Repository<ZapatoEntity>, _comprasRepository: Repository<ComprasEntity>);
    insertarCliente(cliente: Cliente): Promise<ClienteEntity>;
    obtenerClientes(parametrosBusqueda?: any): Promise<ClienteEntity[]>;
    actualizarCliente(cliente: Cliente): Promise<import("typeorm").UpdateResult>;
    borrarCliente(cliente: Cliente): Promise<import("typeorm").DeleteResult>;
    insertarZapato(zapato: Zapato): Promise<ZapatoEntity>;
    obtenerZapatos(parametrosBusqueda?: any): Promise<ZapatoEntity[]>;
    actualizarZapato(zapato: Zapato): Promise<import("typeorm").UpdateResult>;
    borrarZapato(zapato: Zapato): Promise<import("typeorm").DeleteResult>;
    obtenerCompras(parametrosBusqueda?: any): Promise<ComprasEntity[]>;
}
