import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { EnvConstants, Queue } from './common/constants';

async function bootstrap() {
  // Create hybrid application (HTTP + Microservice)
  const app = await NestFactory.create(AppModule);

  // Connect microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [EnvConstants.rabbitMQUrl || 'amqp://localhost:5672'],
      queue: Queue.IAM,
      queueOptions: {
        durable: false,
      },
    },
  });

  // Get logger and configuration service
  const logger = app.get(LoggerService);
  const configService = app.get(ConfigService);
  app.useLogger(logger);

  // Apply validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Start microservice
  await app.startAllMicroservices();

  // Start HTTP server for health checks
  const port = process.env.HTTP_PORT || 3006;
  await app.listen(port);

  logger.log(`IAM Application running`, 'IAM - bootstrap');
  logger.log(`IAM HTTP server listening on port ${port}`, 'IAM - bootstrap');
  logger.log(
    `IAM Environment: ${configService.get<string>('NODE_ENV') || 'development'}`,
    'IAM - bootstrap',
  );
}
bootstrap();
