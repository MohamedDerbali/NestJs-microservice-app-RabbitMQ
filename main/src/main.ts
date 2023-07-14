import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './dotenv.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(
    {
      origin: process.env.FRONTEND_URL,
    }
  );
  await app.listen(5000);
}
bootstrap();
