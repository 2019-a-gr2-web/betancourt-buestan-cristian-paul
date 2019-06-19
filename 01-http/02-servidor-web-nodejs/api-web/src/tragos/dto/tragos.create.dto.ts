import {DistribuidorEntity} from "../../distribuidor/distribuidor.entity";
import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class TragosCreateDto {
    @IsEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;

    @IsNotEmpty()
    @IsNumber()
    gradosAlcohol: number;

    @IsDate()
    fechaCaducidad: Date;

    @IsNumber()
    precio: number;

    @IsOptional()
    @IsNumber()
    distribuidorId: number;
}