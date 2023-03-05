import { AlterTableTransactions1678052684139 } from 'src/migrations/1678052684139-AlterTableTransactions';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'picpay',
        password: 'root',
        database: 'picpay',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        migrationsTableName: 'migrations',
        synchronize: true, 
        migrations: ["./dist/src/migrations/*{.ts,.js}"],
        migrationsRun: true
      });

      return dataSource.initialize();
    },
  },
];