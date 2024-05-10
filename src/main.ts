import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS project')
    .setDescription('NestJS project API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  // ValidationPipe 전역 적용
  app.useGlobalPipes(
    new ValidationPipe({
      // class-transformer 적용
      transform: true,
    }),
  );

  const port = 3000;
  await app.listen(port);
  console.info(`NODE_ENV: ${configService.get('NODE_ENV')}`);
  console.info(`listening on port ${port}`);
}
bootstrap();
