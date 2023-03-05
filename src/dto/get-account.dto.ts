import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class GetAccountDTO{
 
    @IsNotEmpty({
        message:"Documento do cliente é obrigatório"
        })
        @ApiProperty({
            description: "Documento do cliente",
            type: String
        })
    document: string; 
}