import { NestFactory } from '@nestjs/core';
import { ServiceUnavailableException } from '@nestjs/common';
import { AppModule } from './app.module';
import { RedisService } from './redis/redis.service';
import { NewsapiService } from './newsapi/newsapi.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const newsService = app.get(NewsapiService);
  const redisService = app.get(RedisService);

  const data = await newsService.fetch();
  if (data.status !== 'ok') throw new ServiceUnavailableException();

  const res = newsService.transformData(data);
  redisService.save('NEWS_DATA', res);

  await app.close();
}
bootstrap();
