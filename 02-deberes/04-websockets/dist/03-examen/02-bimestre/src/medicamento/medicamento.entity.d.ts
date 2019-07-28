import { PacienteEntity } from "../paciente/paciente.entity";
export declare class MedicamentoEntity {
    id: number;
    gramosAIngerir: string;
    nombre: string;
    composicion: string;
    usadoPara: string;
    fechaCaducidad: string;
    numeroPastillas: number;
    precio: number;
    paciente: PacienteEntity;
}
