import { Test, TestingModule } from "@nestjs/testing";
import { AccountService } from "./account.services";
import { accountProvider, eventsProvider, transactionsProvider } from "../repositories/providers";
import { DatabaseTestModule } from "../database/databaseTest.module";
import { TransactionsService } from "./transactions.services";
import { EventsServices } from "./events.services";


describe('Suit test services', () => {
    let accountService: AccountService;
    let moduleRef: TestingModule
    let transactionServices: TransactionsService;
    let eventsServices: EventsServices;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [
                DatabaseTestModule
            ],
            providers: [...transactionsProvider,
            ...accountProvider,
            ...eventsProvider,
                TransactionsService,
                AccountService,
                EventsServices],

        }).compile();


        transactionServices = moduleRef.get<TransactionsService>(TransactionsService);
        accountService = moduleRef.get<AccountService>(AccountService);
        eventsServices = moduleRef.get<EventsServices>(EventsServices);

        await eventsServices.set('credito', 'C')
        await eventsServices.set('debito', 'D')
        await eventsServices.set('estorno credito', 'D')
        await eventsServices.set('estorno debito', 'C')
    });

    describe('TransactionsAccount', () => {
        it('Salvar conta', async () => {
            const account = await accountService.save({ name: 'John Doe', document: '12345679' })
            expect(account.id).toBe(1)
        })

        it('Buscar conta pelo número do documento', async () => {
            const account = await accountService.get('12345679')

            expect(account.id).toBe(1)
        })

        it('Teste Saldo', async () => {
            await transactionServices.set("12345679", 15, "credito", "C")
            const account = await accountService.get('12345679')

            expect(account.saldo).toBe(15)
        })


    })


    describe('TransactionsAccount', () => {
        it('Enviar transação', async () => {

            const transaction = await transactionServices.set("12345679", 10, "credito", "C")

            expect(transaction.amount).toBe(10)

        })

        it('Enviar transação duplicada', async () => {
            let transaction = await transactionServices.set("12345679", 10, "credito", "C")
            transaction = await transactionServices.set("12345679", 10, "credito", "C")

            expect(transaction).toBe("Error: Transação duplicada, aguarde alguns minutos e tente novamente!")

        })

        it('Buscar extrato', async () => {
            const limit = 11 //gero 11 transações e na paginação listo apenas 10
            for (let index = 0; index < limit; index++) {
                await transactionServices.set("12345679", index + 1, "credito", "C");
            }

            const transactions = await transactionServices.getExtract("12345679", 0, 10)

            expect(transactions.length).toBe(10)
        })


        it('Teste Estorno', async () => {

            const transactions = await transactionServices.set("12345679", 15, "credito", "C")

            const transactionBack = await transactionServices.setChargeBack("12345679", transactions.id, "estorno credito")

            expect(transactionBack.amount).toBe("15")
        })

    })

})

