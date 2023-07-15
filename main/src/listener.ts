import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import './dotenv.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_LOCALHOST],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  app.listen();
}
bootstrap();
