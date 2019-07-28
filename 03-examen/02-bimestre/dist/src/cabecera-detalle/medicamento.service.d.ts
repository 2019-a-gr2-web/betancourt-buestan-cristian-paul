import { Repository } from "typeorm";
import { CabeceraEntity } from "./medicamento.entity";
import { Medicamento } from "./medicamento";
export declare class MedicamentoService {
    private readonly _medicamentoRepository;
    constructor(_medicamentoRepository: Repository<CabeceraEntity>);
    insertarCliente(medicamento: Medicamento): Promise<CabeceraEntity>;
    obtenerMedicamentos(parametrosBusqueda?: any): Promise<CabeceraEntity[]>;
    actualizarCliente(medicamento: Medicamento): void;
    borrarCliente(medicamento: Medicamento): void;
}
