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