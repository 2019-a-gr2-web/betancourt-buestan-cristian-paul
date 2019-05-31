import {Injectable} from '@nestjs/common';
import {SistemaOperativo, Aplicacion} from "./interfaces/interfaces.js";


@Injectable()
export class AppService {
    aplicaciones: Aplicacion[] = [];
    sistemasOperativos: SistemaOperativo[] = [];
    idSO: number;

    constructor() {
        this.idSO = 0;
    }

    buscarPorNombreSO(nombre: string): SistemaOperativo {
        return this.sistemasOperativos.find(so => {
            return so.nombre == nombre.toUpperCase().trim()
        });
    }

    insertarSO(so: SistemaOperativo) {
        so.id = this.idSO;
        this.idSO++;
        this.sistemasOperativos.push(so);
    }

    eliminarSO(idSO: number) {
        const indice = this.sistemasOperativos.findIndex(
            so => {
                return so.id === idSO;
            }
        );

        this.sistemasOperativos.splice(indice, 1);
        this.aplicaciones = this.aplicaciones.filter(
            app => {
                return app.sistemaOperativoId != idSO;
            }
        );
    }

}
