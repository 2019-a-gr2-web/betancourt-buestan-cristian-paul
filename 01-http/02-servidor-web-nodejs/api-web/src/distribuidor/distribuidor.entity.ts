import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {OneToMany} from "typeorm";
import {TragosEntity} from "../tragos/tragos.entity";

@Entity('bd_distribuidor') // Nombre tabla
export class DistribuidorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: String;

    @OneToMany(type => TragosEntity, trago => trago.id)
    tragos: TragosEntity[]
}