import { PacienteEntity } from "../paciente/paciente.entity";
export declare class CabeceraEntity {
    id: number;
    gramosAIngerir: string;
    nombre: string;
    composicion: string;
    usadoPara: string;
    fechaCaducidad: string;
    numeroPastillas: number;
    paciente: PacienteEntity;
}
