import { Injectable, Inject } from "@nestjs/common";
import { Account } from "../entity/account.entity";
import { Events } from '../entity/events.entity'
import { Transactions } from "../entity/transactions.entity";
import { Repository } from "typeorm";
import * as dayjs from 'dayjs'
import { AccountService } from "./account.services";

interface EventsTransactions {
    id?: number,
    name?: string,
    type: string,
    createAt?: Date
}


export interface TransactionsProps {
    id?: number,
    events: EventsTransactions,
    amount: number,
    document?: string,
    type?: string,

    createAt?: Date
}


const timeInterval = 60000

@Injectable()
export class TransactionsService {
    constructor(
        @Inject('TRANSACTIONS_REPOSITORY')
        private readonly transactionsRepository: Repository<Transactions>,
        @Inject('ACCOUNT_REPOSITORY')
        private readonly accountRepository: Repository<Account>,
        @Inject('EVENTS_REPOSITORY')
        private readonly eventsRepository: Repository<Events>,
    ) {
    }

    async getExtract(document: string, page: number, limit: number) {

        const account = await this.accountRepository.findOneBy({ document })

        return await this.transactionsRepository.createQueryBuilder('transactions')
            .innerJoinAndSelect('transactions.events', 'events')
            .where('transactions.account = :accountId', { accountId: account.id })
            .orderBy('transactions.createAt', 'DESC')
            .skip(page)
            .limit(limit)
            .getMany()

    }

    async set(document: string, amount: number, event: string, type: string) {
        //buscar conta
        try {
            const accountData = await this.accountRepository.createQueryBuilder('account')
                .leftJoinAndSelect('account.transactions', 'transactions')
                .leftJoinAndSelect('transactions.events', 'events')
                .where('account.document = :document', { document: document }).getOne()

            if (accountData) {

                const transactionlast = accountData.transactions ? accountData.transactions[accountData.transactions.length - 1] : null


                if (transactionlast) {
                    const dateLastTransaction = dayjs(transactionlast.createAt)
                    const dateNow = dayjs(new Date())

                    if (dateNow.diff(dateLastTransaction) < timeInterval
                        && transactionlast.events.type === type
                        && Number(transactionlast.amount) === amount
                        && transactionlast.events.name === event
                    )
                        throw new Error('Transação duplicada, aguarde alguns minutos e tente novamente!')
                }
            }


            //buscar eventos
            const events = await this.eventsRepository.findOneBy({ name: event.toLocaleLowerCase() })

            const transactionsModel = new Transactions()

            transactionsModel.amount = amount
            transactionsModel.events = events
            transactionsModel.account = accountData
            transactionsModel.createAt = new Date()

          return  await this.transactionsRepository.save(transactionsModel)

          
        } catch (error) {
            return error.toString()
        }

    }

    async setChargeBack(document: string, transactionId: number, events: string) {

        try {
            const account = await this.accountRepository.findOneBy({ document })

            if (!account) throw new Error('Conta não encontrado')

            const transaction = await this.transactionsRepository.createQueryBuilder('transactions')
                .innerJoinAndSelect('transactions.events', 'events')
                .where('transactions.id = :id', { id: transactionId })
                .getOne()

            console.log('transaction ', transaction)
            if (!transaction) throw new Error('Transação não encontrado')

            if(transaction.reversed) throw new Error('Transação já estornada!')

            const eventsData = await this.eventsRepository.findOneBy({ name: events })

            if (!eventsData) throw new Error('Evento de transação não encontrado')

            const transactionsModel = new Transactions()

            transactionsModel.amount = transaction.amount
            transactionsModel.events = eventsData
            transactionsModel.account = account
            transactionsModel.createAt = new Date()

            const transactionBack = await this.transactionsRepository.save(transactionsModel)

            if (transactionBack.id)
                await this.transactionsRepository
                    .createQueryBuilder()
                    .update(Transactions)
                    .set({ reversed: true })
                    .where("id = :id", { id: transaction.id })
                    .execute()

                    
            return transactionBack
        }
        catch (error) {
            return error.toString()
        }


    }

}