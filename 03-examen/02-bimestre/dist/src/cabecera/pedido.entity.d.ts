import { MedicamentoEntity } from "../medicamento/medicamento.entity";
export declare class PedidoEntity {
    id: number;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    hijos: number;
    tieneSeguro: boolean;
    medicamentos: MedicamentoEntity[];
}
