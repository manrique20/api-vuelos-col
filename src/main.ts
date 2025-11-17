// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
export default bootstrap;
