import {Injectable} from '@nestjs/common';
import {SistemaOperativo, Aplicacion} from "./interfaces/interfaces.js";


@Injectable()
export class AppService {
    aplicaciones: Aplicacion[] = [];
    sistemasOperativos: SistemaOperativo[] = [];
    idSO: number;
    idApp: number;

    constructor() {
        this.idSO = 1;
        this.idApp = 0;

        this.sistemasOperativos.push(new class implements SistemaOperativo {
            fechaLanzamiento: Date = new Date();
            id: number = 0;
            instalado: boolean = true;
            nombre: string = 'Linux';
            pesoEnGigas: number = 4;
            versionApi: number = 5;
        })
    }

    buscarPorNombreSO(nombre: string): SistemaOperativo[] {
        return this.sistemasOperativos.filter(so => {
            return so.nombre.toUpperCase() == nombre.toUpperCase().trim()
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

    buscarPorNombreApp(nombre: string, idSO: number): Aplicacion[] {
        return this.aplicaciones.filter(app => {
            return ((app.nombre.toUpperCase().trim() === nombre.toUpperCase().trim())
                && (app.sistemaOperativoId == idSO));
        });
    }

    buscarApp(idSO: number): Aplicacion[] {
        return this.aplicaciones.filter(app => {
            return app.sistemaOperativoId == idSO
        });


    }

    insertarApp(app: Aplicacion) {
        app.id = this.idApp;
        this.idApp++;
        this.aplicaciones.push(app);
        console.log(this.aplicaciones.length)
    }

    eliminarApp(idApp: number) {
        const indice = this.aplicaciones.findIndex(
            app => {
                return app.id == idApp;
            }
        );
        this.aplicaciones.splice(indice, 1);
    }
}
