import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('API Wallet')
    .setDescription('API desafio técnico para vaga de Backend')
    .setVersion('1.0')
    .addTag('Account')
    .addTag('Transactions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  
  await app.listen(3000);
}
bootstrap();
