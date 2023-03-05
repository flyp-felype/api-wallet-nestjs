import { Module } from '@nestjs/common';
import { databaseProviders } from './databaseTest.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseTestModule {}