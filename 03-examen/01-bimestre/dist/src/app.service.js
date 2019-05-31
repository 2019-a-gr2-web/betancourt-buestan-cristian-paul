"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor() {
        this.aplicaciones = [];
        this.sistemasOperativos = [];
        this.idSO = 1;
        this.idApp = 0;
        this.sistemasOperativos.push(new class {
            constructor() {
                this.fechaLanzamiento = new Date();
                this.id = 0;
                this.instalado = true;
                this.nombre = 'Linux';
                this.pesoEnGigas = 4;
                this.versionApi = 5;
            }
        });
    }
    buscarPorNombreSO(nombre) {
        return this.sistemasOperativos.filter(so => {
            return so.nombre.toUpperCase() == nombre.toUpperCase().trim();
        });
    }
    insertarSO(so) {
        so.id = this.idSO;
        this.idSO++;
        this.sistemasOperativos.push(so);
    }
    eliminarSO(idSO) {
        const indice = this.sistemasOperativos.findIndex(so => {
            return so.id === idSO;
        });
        this.sistemasOperativos.splice(indice, 1);
        this.aplicaciones = this.aplicaciones.filter(app => {
            return app.sistemaOperativoId != idSO;
        });
    }
    buscarPorNombreApp(nombre, idSO) {
        return this.aplicaciones.filter(app => {
            return ((app.nombre.toUpperCase().trim() === nombre.toUpperCase().trim())
                && (app.sistemaOperativoId == idSO));
        });
    }
    buscarApp(idSO) {
        return this.aplicaciones.filter(app => {
            return app.sistemaOperativoId == idSO;
        });
    }
    insertarApp(app) {
        app.id = this.idApp;
        this.idApp++;
        this.aplicaciones.push(app);
        console.log(this.aplicaciones.length);
    }
    eliminarApp(idApp) {
        const indice = this.aplicaciones.findIndex(app => {
            return app.id == idApp;
        });
        this.aplicaciones.splice(indice, 1);
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map