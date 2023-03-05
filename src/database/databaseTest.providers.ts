import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'picpay',
        password: 'root',
        database: 'picpayTest',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ], 
        synchronize: true,
        dropSchema: true,

      });

      return dataSource.initialize();
    
    },
  },
];