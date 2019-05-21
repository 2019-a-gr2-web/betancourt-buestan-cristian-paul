import {Controller, Get, Response} from "@nestjs/common";
import {TragosService} from "./tragos.services";

@Controller('/api/traguito')
export class TragosController {
    constructor(private readonly _tragosService: TragosService) {
    }

    @Get('lista')
    listarTragos(@Response() res) {
        const arregloTragos = this._tragosService.bddTragos;
        res.render('tragos/lista-tragos', {arregloTragos: arregloTragos})
    }

}