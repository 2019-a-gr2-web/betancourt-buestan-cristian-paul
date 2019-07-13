import { DistribuidorEntity } from "../distribuidor/distribuidor.entity";
import { FiestaEntity } from "../fiesta/fiesta.entity";
export declare class TragosEntity {
    id: number;
    nombre: string;
    tipo: 'Ron' | 'Vodka' | 'Whiskey' | 'Tequila' | 'Puntas' | 'Cerveza';
    gradosAlcohol: number;
    fechaCaducidad: Date;
    precio: number;
    distribuidorID: DistribuidorEntity;
    fiestas: FiestaEntity[];
}
