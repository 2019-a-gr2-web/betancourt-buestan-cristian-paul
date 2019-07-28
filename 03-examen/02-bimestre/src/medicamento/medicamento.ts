import {Paciente} from "../paciente/paciente";

export interface Medicamento {
    id?: number;
    gramosAIngerir: string;
    nombre: string;
    composicion: string;
    usadoPara: string;
    fechaCaducidad: string;
    numeroPastillas: number;
    precio: number
    paciente: Paciente
}
