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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const cliente_entity_1 = require("./cliente.entity");
const zapato_entity_1 = require("./zapato.entity");
const compras_entity_1 = require("./compras.entity");
let AppService = class AppService {
    constructor(_clienteRepository, _zapatoRepository, _comprasRepository) {
        this._clienteRepository = _clienteRepository;
        this._zapatoRepository = _zapatoRepository;
        this._comprasRepository = _comprasRepository;
    }
    insertarCliente(cliente) {
        const objetoEntidad = this._clienteRepository
            .create(cliente);
        return this._clienteRepository.save(objetoEntidad);
    }
    obtenerClientes(parametrosBusqueda) {
        return this._clienteRepository.find(parametrosBusqueda);
    }
    actualizarCliente(cliente) {
        return this._clienteRepository.createQueryBuilder()
            .update(cliente)
            .set({ nombre: `${cliente.nombre}`, apellido: `${cliente.apellido}`, cedula: `${cliente.cedula}` })
            .where("codigoCli = :id", { id: cliente.codigoCli })
            .execute();
    }
    borrarCliente(cliente) {
        return this._clienteRepository
            .createQueryBuilder()
            .delete()
            .from('cliente')
            .where("codigoCli = :id", { id: cliente.codigoCli })
            .execute();
    }
    insertarZapato(zapato) {
        const objetoEntidad = this._zapatoRepository
            .create(zapato);
        return this._zapatoRepository.save(objetoEntidad);
    }
    obtenerZapatos(parametrosBusqueda) {
        return this._zapatoRepository.find(parametrosBusqueda);
    }
    actualizarZapato(zapato) {
        return this._zapatoRepository.createQueryBuilder()
            .update(zapato)
            .set({
            codigoZap: zapato.codigoZap,
            talla: zapato.talla,
            tipo: `${zapato.tipo}`,
            color: `${zapato.color}`,
            precio: zapato.precio,
            cantidad: zapato.cantidad,
            marca: `${zapato.marca}`
        })
            .where("codigoZap = :id", {
            id: zapato.codigoZap
        })
            .execute();
    }
    borrarZapato(zapato) {
        return this._zapatoRepository
            .createQueryBuilder()
            .delete()
            .from('zapato')
            .where("codigoZap = :id", { id: zapato.codigoZap })
            .execute();
    }
    obtenerCompras(parametrosBusqueda) {
        return this._comprasRepository.find(parametrosBusqueda);
    }
    insertarCompra(compra) {
        const objetoEntidad = this._comprasRepository
            .create(compra);
        return this._comprasRepository.save(objetoEntidad);
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(cliente_entity_1.ClienteEntity)),
    __param(1, typeorm_2.InjectRepository(zapato_entity_1.ZapatoEntity)),
    __param(2, typeorm_2.InjectRepository(compras_entity_1.ComprasEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _c : Object])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map