import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateAccountDTO {
    @IsNotEmpty({
        message: "Nome do cliente é obrigatório"
    })
    @ApiProperty({
        description: "Nome do cliente",
        type: String
    })
    name: string;

    @IsNotEmpty({
        message: "Documento do cliente é obrigatório"
    })
    @ApiProperty({
        description: "Documento do cliente",
        type: String
    })
    document: string;

}