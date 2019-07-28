import {Body, Controller, Get, Post, Response, Request, Query} from '@nestjs/common';
import {PacienteService} from "./paciente.service";

@Controller('paciente')
export class PacienteController {
    constructor(private readonly paciente: PacienteService) {
    }

    @Get('lista')
    async listaPacientes(@Response() res, @Request() req) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
        const listaPacientes = await this.paciente.obtenerPacientes()
        res.render('pacientes', {
            pacientes: listaPacientes
        })
    }

    cookieUsuarioValida(@Response() res, tipoUsuario: string, tipoUsuarioV: string) {
        if (!tipoUsuario || tipoUsuario != tipoUsuarioV) {
            res.redirect('/api/cerrar');
        }
    }
}
