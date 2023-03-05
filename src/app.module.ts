import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountController } from './controller/account.controller';
import { TransactionsController } from './controller/transaction.controller';
import { DatabaseModule } from './database/database.module';
import { accountProvider, eventsProvider, transactionsProvider } from './repositories/providers';
import { AccountService } from './services/account.services';
import { TransactionsService } from './services/transactions.services';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [AccountController, TransactionsController],
  providers: [...accountProvider,
  ...eventsProvider,
  ...transactionsProvider,
    AppService,
    AccountService,
    TransactionsService],
})
export class AppModule { }
