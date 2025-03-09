import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
    // {
    //   bufferLogs: true,
    // }
  );
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useLogger(app.get(LoggerService));
  app.enableCors({
    origin: process.env.WEB_APP_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '127.0.0.1';
  await app.listen(port, host);
}
bootstrap();
