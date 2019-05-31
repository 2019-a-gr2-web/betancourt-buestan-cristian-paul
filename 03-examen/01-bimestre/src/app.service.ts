import {Injectable} from '@nestjs/common';
import {SistemaOperativo, Aplicacion} from "./interfaces/interfaces.js";


@Injectable()
export class AppService {
    aplicaciones: Aplicacion[] = [];
    sistemasOperativos: SistemaOperativo[] = [];

    constructor() {


    }

    buscarPorNombreSO(nombre: string): SistemaOperativo {
        return this.sistemasOperativos.find(so => {
            return so.nombre == nombre.toUpperCase().trim()
        });
    }


}
