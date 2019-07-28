import {Entity} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";

@Entity('pedido') // Nombre tabla
export class PedidoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombre',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'direccion',
    })
    direccion: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'telefono'
    })
    telefono: string;

    @Column({
        type: 'varchar',
        name: 'cedula',
    })
    cedula: string;

    @Column({
        type: 'varchar',
        name: 'estado',
    })
    estado: string;

    @Column({
        type: 'double',
        name: 'subtotal',
        default: 0
    })
    subtotal: number;

    @Column({
        type: 'double',
        name: 'total',
        default: 0
    })
    total: number;
}
