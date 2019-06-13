import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}