import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GettransactionsPaginatioDTO{
 
    @IsNotEmpty({
        message:"Documento do cliente é obrigatório"
        })
        @ApiProperty({
            description: "Evento de transação (credito, debito, compra)",
            type: String
        })
    document: string;
    @ApiProperty({
        description: "Limite de items retornado",
        type: Number
    })
    limit: number = 10;
    
    @ApiProperty({
        description: "Páginação",
        type: Number
    })
    page: number = 0
}