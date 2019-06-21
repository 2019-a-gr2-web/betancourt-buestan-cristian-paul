import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FiestaEntity} from "../../../../01-http/02-servidor-web-nodejs/api-web/src/fiesta/fiesta.entity";
import {ComprasEntity} from "./compras.entity";

@Entity('Cliente') // Nombre tabla
export class ClienteEntity {

    @PrimaryGeneratedColumn()
    codigoCli: number;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'nombre',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 15,
        name: 'apellido',
    })
    apellido: string;

    @Column({
        type: 'varchar',
        length: 15,
        name: 'cedula',
    })
    cedula: string;

    @OneToMany(type => ComprasEntity, compras => compras)
    compras: ComprasEntity[];
}