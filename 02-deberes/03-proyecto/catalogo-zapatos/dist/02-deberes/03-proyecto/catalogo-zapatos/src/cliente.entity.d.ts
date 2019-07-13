import { ComprasEntity } from "./compras.entity";
export declare class ClienteEntity {
    codigoCli: number;
    nombre: string;
    apellido: string;
    cedula: string;
    compras: ComprasEntity[];
}
