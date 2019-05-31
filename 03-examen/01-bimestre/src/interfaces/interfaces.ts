export interface Aplicacion {
    id?: number;
    pesoEnGigas: number;
    version: number;
    nombre: string;
    urlDescarga: string;
    fechaLanzamiento: Date;
    costo: number;
    sistemaOperativoId: number;
}

export interface SistemaOperativo {
    id?: number;
    nombre: string;
    versionApi: number;
    fechaLanzamiento: Date;
    pesoEnGigas: number;
    instalado: boolean
}