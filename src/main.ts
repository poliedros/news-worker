import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NewsapiService } from './newsapi/newsapi.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const newsService = app.get(NewsapiService);

  const res = await newsService.fetch();
  console.log(res);

  await app.close();
}
bootstrap();
