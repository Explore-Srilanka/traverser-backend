import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(helmet());

  app.use(morgan('dev'));

  app.enableCors();

  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3000;

  await app.listen(port);

  return port;
}

bootstrap().then((port) =>
  console.log(`App successfully started on port ${port} !`),
);
