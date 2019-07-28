import {Body, Controller, Get, Post, Response, Request, Param, Query} from '@nestjs/common';
import {MedicamentoService} from "./medicamento.service";
import {Medicamento} from "./medicamento";
import {Like} from "typeorm";

@Controller('medicamento')
export class MedicamentoController {
    constructor(private readonly medicamento: MedicamentoService) {
    }

    @Get('lista/:idPaciente?')
    async medicamentos(@Response() res, @Request() req, @Param('idPaciente') idPaciente: number, @Query() query) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
        let consulta
        let listaMedicamentos
        if (query.nombre) {
            consulta = {
                where: [
                    {
                        nombre: Like(`%${query.nombre}%`),
                        paciente: idPaciente
                    }
                ]
            };
            listaMedicamentos = await this.medicamento.obtenerMedicamentos(consulta)
        } else if (query.composicion) {
            consulta = {
                where: [
                    {
                        composicion: Like(`%${query.composicion}%`),
                        paciente: idPaciente
                    }
                ]
            };
            listaMedicamentos = await this.medicamento.obtenerMedicamentos(consulta)
        } else {
            consulta = {
                where: [
                    {
                        paciente: idPaciente
                    }
                ]
            };
            listaMedicamentos = await this.medicamento.obtenerMedicamentos(consulta)
        }
        // const medicamentos = listaMedicamentos.filter(med => {
        // })
        console.log(idPaciente)
        console.log(listaMedicamentos)
        res.render('medicamentos', {
            idPaciente: idPaciente,
            listaMedicamentos: listaMedicamentos
        })
    }

    @Post('insertar')
    async crearMedicamento(@Request() req, @Response() res, @Body() medicamento: Medicamento, @Body('idPaciente') idPaciente: number) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'administrador')
        medicamento.paciente = {
            nombres: "",
            apellidos: "",
            id: idPaciente,
            hijos: 0,
            fechaNacimiento: "",
            tieneSeguro: true
        }
        await this.medicamento.insertarMedicamento(medicamento)
        res.redirect('/medicamento/lista' + `/${idPaciente}`)
    }

    @Get('insertar/:idPaciente')
    insertarMedicamento(@Response() res, @Request() req, @Param('idPaciente') idPaciente: number) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
        res.render('crearMedicamento', {idPaciente: idPaciente, actualizar: false, medicamento: null})
    }

    @Post('eliminar/:idPaciente')
    eliminarMedicamento(@Response() res, @Request() req, @Param('idPaciente') idPaciente: number, @Body('id') id: number) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
        this.medicamento.eliminarMedicamento(id)
        res.redirect('/medicamento/lista/' + `${idPaciente}`)
    }

    @Post('actualizar/:idPaciente')
    async actualizarPaciente(@Response() res, @Request() req, @Param('idPaciente') idPaciente: number, @Body('id') id: number) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'administrador');
        const listaMedicamentos = await this.medicamento.obtenerMedicamentos()
        const medicamento = listaMedicamentos.find(med => {
            return med.id == id
        })
        res.render('crearMedicamento', {idPaciente: idPaciente, actualizar: true, medicamento: medicamento})
    }

    @Post('actualizarEjecutar')
    async ejecutarActualizacion(@Request() req, @Response() res, @Body() medicamento: Medicamento, @Body('idPaciente') idPaciente: number) {
        const tipoUsuario = req.signedCookies.tipoUsuario
        this.cookieUsuarioValida(res, tipoUsuario, 'administrador')
        await this.medicamento.actualizarMedicamento(medicamento)
        res.redirect('/medicamento/lista/' + `${idPaciente}`)
    }

    cookieUsuarioValida(@Response() res, tipoUsuario: string, tipoUsuarioV: string) {
        if (!tipoUsuario || tipoUsuario != tipoUsuarioV) {
            res.redirect('/api/cerrar');
        }
    }
}
