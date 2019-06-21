import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FiestaEntity} from "../../../../01-http/02-servidor-web-nodejs/api-web/src/fiesta/fiesta.entity";
import {ComprasEntity} from "./compras.entity";

@Entity('Zapato') // Nombre tabla
export class ZapatoEntity {

    @PrimaryGeneratedColumn()
    codigoZap: number;

    @Column({
        type: 'varchar',
        length: 15,
        name: 'marca',
    })
    marca: string;

    @Column({
        type: 'varchar',
        length: 15,
        name: 'color',
    })
    color: string;

    @Column({
        type: 'int',
        name: 'talla',
    })
    talla: number;

    @Column({
        type: 'varchar',
        length: 6,
        name: 'tipo',
    })
    tipo: string;

    @Column({
        type: 'int',
        name: 'cantidad',
    })
    cantidad: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'precio',
    })
    precio: number;

    @OneToMany(type => ComprasEntity, compras => compras)
    compras: ComprasEntity[];
}