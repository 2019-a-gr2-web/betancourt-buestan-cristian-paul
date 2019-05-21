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
let TragosService = class TragosService {
    constructor() {
        this.bddTragos = [];
        this.recnum = 1;
        const traguito = {
            nombre: 'Pilsener',
            gradosAlcohol: 4.3,
            fechaCaducidad: new Date(2019, 5, 10),
            precio: 1.75,
            tipo: "Cerveza"
        };
        this.crear(traguito);
    }
    crear(nuevoTrago) {
        nuevoTrago.id = this.recnum;
        this.recnum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
    }
    buscarPorId(id) {
        return this.bddTragos.find(trago => {
            return trago.id === id;
        });
    }
    buscarPorNombre(nombre) {
        return this.bddTragos.find(trago => {
            return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
        });
    }
    eliminar(id) {
        const indice = this.bddTragos.findIndex(trago => {
            return trago.id === id;
        });
        this.bddTragos.splice(indice, 1);
        return this.bddTragos;
    }
    actualizar(tragoActualizado, id) {
        const indice = this.bddTragos.findIndex(trago => {
            return trago.id === id;
        });
        tragoActualizado.id = this.bddTragos[indice].id;
        return this.bddTragos;
    }
};
TragosService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], TragosService);
exports.TragosService = TragosService;
//# sourceMappingURL=tragos.services.js.map