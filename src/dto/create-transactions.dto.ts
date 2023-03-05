import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTransactionsDTO {
    @IsNotEmpty({
        message: "Documento do cliente é obrigatório"
    })

    @ApiProperty({
        description: "Documento do cliente",
        type: String
    })
    document: string;

    @IsNotEmpty({
        message: "Evento da transação é obrigatório"
    })
   
    @ApiProperty({
        description: "Evento de transação (credito, debito, compra)",
        type: String
    })
    event: string;

    @IsNotEmpty({
        message: "Tipo da transação é obrigatório"
    })
    @ApiProperty({
        description: "Tipo de transação (C = credito e D = debito)",
        type: String
    })
    type: string;

    @IsNotEmpty({
        message: "Valor da transação é obrigatório"
    })
    @ApiProperty({
        description: "Valor da transação",
        type: Number
    })
    amount: number;



}