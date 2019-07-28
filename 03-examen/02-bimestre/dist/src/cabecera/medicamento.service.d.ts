import { Repository } from "typeorm";
import { MedicamentoEntity } from "./medicamento.entity";
import { Medicamento } from "./medicamento";
export declare class MedicamentoService {
    private readonly _medicamentoRepository;
    constructor(_medicamentoRepository: Repository<MedicamentoEntity>);
    insertarCliente(medicamento: Medicamento): Promise<MedicamentoEntity>;
    obtenerMedicamentos(parametrosBusqueda?: any): Promise<MedicamentoEntity[]>;
    actualizarCliente(medicamento: Medicamento): void;
    borrarCliente(medicamento: Medicamento): void;
}
