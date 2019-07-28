import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MedicamentoEntity} from "./medicamento.entity";
import {Medicamento} from "./medicamento";

@Injectable()
export class MedicamentoService {

    constructor(@InjectRepository(MedicamentoEntity)
                private readonly _medicamentoRepository: Repository<MedicamentoEntity>) {
    }

    insertarMedicamento(medicamento: Medicamento) {
        const objetoEntidad = this._medicamentoRepository
            .create(medicamento)
        this._medicamentoRepository.save(objetoEntidad)
    }

    obtenerMedicamentos(parametrosBusqueda?): Promise<MedicamentoEntity[]> {
        return this._medicamentoRepository.find(parametrosBusqueda)
    }

    actualizarMedicamento(medicamento: Medicamento) {
        return this._medicamentoRepository.createQueryBuilder()
            .update(medicamento)
            .set({
                nombre: `${medicamento.nombre}`,
                composicion: `${medicamento.composicion}`,
                gramosAIngerir: medicamento.gramosAIngerir,
                usadoPara: medicamento.usadoPara,
                fechaCaducidad: `${medicamento.fechaCaducidad}`,
                numeroPastillas: medicamento.numeroPastillas,
                precio: medicamento.precio
            })
            .where("id = :id", {id: medicamento.id})
            .execute();
    }

    eliminarMedicamento(idMedicamento: number) {
        return this._medicamentoRepository
            .createQueryBuilder()
            .delete()
            .from('medicamento')
            .where("id = :id", {id: idMedicamento})
            .execute();
    }

}
