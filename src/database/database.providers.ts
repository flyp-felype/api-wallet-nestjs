import { AlterTableTransactions1678052684139 } from 'src/migrations/1678052684139-AlterTableTransactions';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_LOCALHOST,
        port: 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
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