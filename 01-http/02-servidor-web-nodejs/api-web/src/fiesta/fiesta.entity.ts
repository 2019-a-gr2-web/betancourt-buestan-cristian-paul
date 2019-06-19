import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TragosEntity} from "../tragos/tragos.entity";

@Entity('bd_fiesta') // Nombre tabla
export class FiestaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: String;

    @ManyToOne( type => TragosEntity, trago=>trago.fiestas)
    tragoId: TragosEntity;
}