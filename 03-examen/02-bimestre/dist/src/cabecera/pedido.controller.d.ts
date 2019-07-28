import { PacienteService } from "./paciente.service";
export declare class PedidoController {
    private readonly paciente;
    constructor(paciente: PacienteService);
    listaPacientes(res: any, req: any): Promise<void>;
    cookieUsuarioValida(res: any, tipoUsuario: string, tipoUsuarioV: string): void;
}
