import {Entity, ManyToOne} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {PacienteEntity} from "../paciente/paciente.entity";

@Entity('medicamento') // Nombre tabla
export class MedicamentoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'gramosAIngerir',
    })
    gramosAIngerir: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombre',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'composicion',
    })
    composicion: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'usadoPara',
    })
    usadoPara: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'fechaCaducidad'
    })
    fechaCaducidad: string;

    @Column({
        type: 'int',
        name: 'numeroPastillas',
    })
    numeroPastillas: number;

    @Column({
        type: 'double',
        name: 'precio',
    })
    precio: number;

    @ManyToOne( type => PacienteEntity, paciente=>paciente.medicamentos)
    paciente: PacienteEntity;
}
