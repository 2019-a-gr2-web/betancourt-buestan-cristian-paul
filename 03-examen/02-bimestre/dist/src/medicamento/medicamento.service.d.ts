import { Repository } from "typeorm";
import { MedicamentoEntity } from "./paciente.entity";
import { Paciente } from "./Paciente";
export declare class MedicamentoService {
    private readonly _pacienteRepository;
    constructor(_pacienteRepository: Repository<MedicamentoEntity>);
    crear(paciente: Paciente): void;
}
