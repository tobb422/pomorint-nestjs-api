import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { logger } from './middleware/logger.middleware'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()
    .setTitle('PomorintAPI example')
    .setDescription('The pomorint-api API description')
    .setVersion('1.0')
    .addTag('pomorint-api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(logger)
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  })
  await app.listen(3001)
}
bootstrap()
