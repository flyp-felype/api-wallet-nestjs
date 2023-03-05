import { Account } from '../entity/account.entity';
import { Transactions } from '../entity/transactions.entity';
import { DataSource } from 'typeorm';
import { Events } from '../entity/events.entity';



export const eventsProvider = [
  {
    provide: 'EVENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Events),
    inject: ['DATA_SOURCE'],
  },
];

export const accountProvider = [
  {
    provide: 'ACCOUNT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Account),
    inject: ['DATA_SOURCE'],
  },
];


export const transactionsProvider = [
  {
    provide: 'TRANSACTIONS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Transactions),
    inject: ['DATA_SOURCE'],
  },
];
