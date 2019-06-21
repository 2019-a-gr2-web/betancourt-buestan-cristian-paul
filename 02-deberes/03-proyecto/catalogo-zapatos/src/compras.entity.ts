import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Compras} from "./interfaces/interfaces";
import {TragosEntity} from "../../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/tragos.entity";
import {ZapatoEntity} from "./zapato.entity";
import {ClienteEntity} from "./cliente.entity";

@Entity('Compras') // Nombre tabla
export class ComprasEntity {

    @PrimaryGeneratedColumn()
    codigoCom: number;

    @Column({
        type: 'date',
        name: 'fecha',
    })
    fecha: Date;

    @Column({
        type: 'int',
        name: 'cantidad',
    })
    cantidad: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'total',
    })
    total: number;

    @Column({
        type: 'boolean',
        name: 'validez',
        default: true
    })
    validez: number;

    @ManyToOne( type => ZapatoEntity, zapato=>zapato.compras)
    ComZapId: ZapatoEntity;

    @ManyToOne( type => ClienteEntity, cliente=>cliente.compras)
    ComCliId: ClienteEntity;
}

