import {Entity, OneToMany} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {MedicamentoEntity} from "../medicamento/medicamento.entity";

@Entity('paciente') // Nombre tabla
export class PacienteEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombres',
    })
    nombres: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'apellidos',
    })
    apellidos: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'fechaNacimiento'
    })
    fechaNacimiento: string;

    @Column({
        type: 'int',
        name: 'hijos',
    })
    hijos: number;

    @Column({
        type: 'bool',
        name: 'tieneSeguro'
    })
    tieneSeguro: boolean;

    @OneToMany(type => MedicamentoEntity, medicamentos => medicamentos)
    medicamentos: MedicamentoEntity[];
}
