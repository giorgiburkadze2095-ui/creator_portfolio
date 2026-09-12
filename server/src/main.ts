import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module.js';

// An Access-Control-Allow-Origin value must be scheme+host only — no path,
// query, or trailing slash. This guards against CLIENT_ORIGIN ever being
// misconfigured with a path (e.g. accidentally set to the API URL, which
// legitimately includes /api) by normalizing down to a bare origin before
// it reaches enableCors, rather than trusting the raw env value verbatim.
function toOrigin(value: string): string {
  try {
    const url = new URL(value);
    return `${url.protocol}//${url.host}`;
  } catch {
    return value;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: toOrigin(config.get<string>('CLIENT_ORIGIN', 'http://localhost:3000')),
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(config.get<number>('PORT', 4000));
}
await bootstrap();
