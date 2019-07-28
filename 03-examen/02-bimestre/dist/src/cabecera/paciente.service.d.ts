import { Repository } from "typeorm";
import { PacienteEntity } from "./paciente.entity";
export declare class PacienteService {
    private readonly _pacienteRepository;
    constructor(_pacienteRepository: Repository<PacienteEntity>);
    crear(paciente: PacienteEntity): void;
    obtenerPaciente(parametrosBusqueda?: any): Promise<PacienteEntity[]>;
}
