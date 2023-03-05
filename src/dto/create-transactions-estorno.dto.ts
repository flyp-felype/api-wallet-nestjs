import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionsEstornoDTO {

    @IsNotEmpty({
        message: "Documento do cliente é obrigatório"
    })
    @ApiProperty({
        description: "Documento do cliente",
        type: String
    })
    document: string;

    @IsNotEmpty({
        message: "ID da transação é obrigatório"
    })
    @ApiProperty({
        description: "ID da transação",
        type: Number
    })
    transaction: number;

    @IsNotEmpty({
        message: "Evento da transação é obrigatório"
    })
    @ApiProperty({
        description: "Evento de estorno (estorno credito, estorno debito)",
        type: String
    })
    events: string;
}