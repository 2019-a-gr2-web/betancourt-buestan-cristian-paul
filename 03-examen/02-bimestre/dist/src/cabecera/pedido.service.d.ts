import { Repository } from "typeorm";
import { PedidoEntity } from "./paciente.entity";
export declare class PedidoService {
    private readonly _pacienteRepository;
    constructor(_pacienteRepository: Repository<PedidoEntity>);
    crear(paciente: PedidoEntity): void;
    obtenerPaciente(parametrosBusqueda?: any): Promise<PedidoEntity[]>;
}
