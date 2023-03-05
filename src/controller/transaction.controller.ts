import { Controller, Post, Res, Body, HttpStatus, Param, Get } from "@nestjs/common";
import { CreateTransactionsDTO } from "src/dto/create-transactions.dto"; 
import { TransactionsService } from "src/services/transactions.services";
import { Response } from 'express' 
import { GettransactionsPaginatioDTO } from "src/dto/get-transactions-pagination.dto";
import { CreateTransactionsEstornoDTO } from "src/dto/create-transactions-estorno.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Transactions")
@Controller('/transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Get('/:document/:limit/:page')
    async get(@Param() params: GettransactionsPaginatioDTO, @Res() res: Response) {
        try {
            const { document, page, limit } = params

            const transactions = await this.transactionsService.getExtract(document, page, limit)
            
            return res.status(HttpStatus.OK).json(transactions)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ success: false, mensagem: error.toString() })
        }
    }

    @Post('/estorno')
    async estorno(@Body() transactionBody:CreateTransactionsEstornoDTO, @Res() res: Response){
        try{
            const {document, transaction, events}  = transactionBody
            const transactionData = await this.transactionsService.setChargeBack(document, transaction, events)

            if(transactionData.id)
                return res.status(HttpStatus.OK).json("Estorno realizado com sucesso!")
            else
                return res.status(HttpStatus.BAD_REQUEST).json({success: false, mensagem: transactionData.toString()})
             
        }catch(error){
            return res.status(HttpStatus.BAD_REQUEST).json({success: false, mensagem: error.toString()})
        }
    }


    @Post()
    async save(@Body() transactionsBody: CreateTransactionsDTO, @Res() res: Response) {
        try {
            const { document, event, type, amount } = transactionsBody
            const account = await this.transactionsService.set(document, amount, event, type)

            if (account.id)
                return res.status(HttpStatus.OK).json(account)
            else
                return res.status(HttpStatus.BAD_REQUEST).json({ success: false, mensagem: account.toString() })

        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ success: false, mensagem: error.toString() })
        }
    }
}