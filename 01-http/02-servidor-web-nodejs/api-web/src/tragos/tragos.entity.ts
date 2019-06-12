import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('bd_trago') // Nombre tabla
export class TragosEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombre_trago',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'tipo_trago',
    })
    tipo: 'Ron' | 'Vodka' | 'Whiskey' | 'Tequila' | 'Puntas' | 'Cerveza';

    @Column({
        type: 'int',
        name: 'grados_alcohol',
    })
    gradosAlcohol: number;

    @Column({
        type: 'date',
        name: 'fecha_caducidad',
    })
    fechaCaducidad: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'precio',
    })
    precio: number;
}