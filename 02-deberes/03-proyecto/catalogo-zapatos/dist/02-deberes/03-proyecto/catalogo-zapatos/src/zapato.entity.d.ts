import { ComprasEntity } from "./compras.entity";
export declare class ZapatoEntity {
    codigoZap: number;
    marca: string;
    color: string;
    talla: number;
    tipo: string;
    cantidad: number;
    precio: number;
    compras: ComprasEntity[];
}
