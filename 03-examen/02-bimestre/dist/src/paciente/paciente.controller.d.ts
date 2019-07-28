import { PacienteService } from "./paciente.service";
export declare class PacienteController {
    private readonly paciente;
    constructor(paciente: PacienteService);
    login(res: any): void;
}
