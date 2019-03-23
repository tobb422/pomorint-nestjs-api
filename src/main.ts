import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { logger } from './middleware/logger.middleware'
import 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(logger)
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  })
  await app.listen(3001)
}
bootstrap()
