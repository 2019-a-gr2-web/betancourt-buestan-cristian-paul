import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Compras} from "./interfaces/interfaces";

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

    // @OneToMany(type => Compras, compra => compra.cliente)
    // co
    //     :
    //     Photo[];
}

