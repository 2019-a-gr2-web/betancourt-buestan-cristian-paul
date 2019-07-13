import { ZapatoEntity } from "./zapato.entity";
import { ClienteEntity } from "./cliente.entity";
export declare class ComprasEntity {
    codigoCom: number;
    fecha: Date;
    cantidad: number;
    total: number;
    validez: boolean;
    comZapId: ZapatoEntity;
    comCliId: ClienteEntity;
}
