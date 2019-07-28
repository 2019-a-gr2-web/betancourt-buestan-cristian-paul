import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PacienteEntity} from "./paciente.entity";
import {Paciente} from "./Paciente";
import {MedicamentoEntity} from "../medicamento/medicamento.entity";

@Injectable()
export class PacienteService {

    constructor(@InjectRepository(PacienteEntity)
                private readonly _pacienteRepository: Repository<PacienteEntity>) {
        let paciente1: PacienteEntity;
        paciente1 = {
            nombres: 'Paul',
            id: 0,
            apellidos: 'Betancourt',
            fechaNacimiento: '1975-05-21',
            hijos: 3,
            tieneSeguro: true,
            medicamentos: null
        };
        // this.crear(paciente1)
    }

    crear(paciente: PacienteEntity) {
        console.log(`crear-pacienteeeeeesssss ${paciente.nombres}`);
        const objetoEntidad = this._pacienteRepository.create(paciente);
        this._pacienteRepository.save(objetoEntidad)
    }


    obtenerPacientes(parametrosBusqueda?): Promise<PacienteEntity[]> {
        return this._pacienteRepository.find(parametrosBusqueda)
    }
}
