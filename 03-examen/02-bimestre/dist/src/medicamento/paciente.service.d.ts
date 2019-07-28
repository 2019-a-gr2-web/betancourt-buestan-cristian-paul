import { Repository } from "typeorm";
import { PacienteEntity } from "./paciente.entity";
import { Paciente } from "./Paciente";
export declare class PacienteService {
    private readonly _pacienteRepository;
    constructor(_pacienteRepository: Repository<PacienteEntity>);
    crear(paciente: Paciente): void;
}
