import { Injectable, Inject } from "@nestjs/common"
import dayjs from "dayjs"
import { Repository } from 'typeorm'; 
import { Account } from "../entity/account.entity"
import { TransactionsProps } from "./transactions.services";



export interface AccountProps {
    id?: number,
    name: string
    document: string
    saldo?: number
    transactions?: TransactionsProps[],
    error?: any
}
 

@Injectable()
export class AccountService {
    constructor(
        @Inject('ACCOUNT_REPOSITORY')
        private readonly accountRespository: Repository<Account> ) {
    }

    async get(document : string){

        const accountData = await  this.accountRespository.createQueryBuilder('account')
        .leftJoinAndSelect('account.transactions', 'transactions')
        .leftJoinAndSelect('transactions.events', 'events')
        .where('account.document = :document', { document: document }).getOne()

        const account: any = accountData

        if (account) {
            account.saldo = 0
            for (let index = 0; index < accountData?.transactions.length; index++) {
                const transaction = accountData?.transactions[index];

                if (transaction.events.type === 'C') account.saldo = Number(account.saldo) + Number(transaction.amount)

                if (transaction.events.type === 'D') account.saldo = Number(account.saldo) - Number(transaction.amount)

            }
        }
        return account
    }

    async save(account: AccountProps) {

        const accountModel = new Account()
        accountModel.name = account.name
        accountModel.document = account.document
        accountModel.createAt = new Date()

        return await this.accountRespository.save(accountModel)

    }
 

}