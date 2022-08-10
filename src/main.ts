import { NestFactory } from '@nestjs/core';
import { ServiceUnavailableException } from '@nestjs/common';
import { AppModule } from './app.module';
import { RedisService } from './redis/redis.service';
import { NewsapiService } from './newsapi/newsapi.service';
import { News } from './interfaces';

function printNews(news: News[], n: number) {
  const { headline, by, publishedAt } = news[n];
  console.log(`Headline: ${headline}`);
  console.log(`By: ${by}`);
  console.log(`Published at: ${publishedAt}`);
  console.log('\n');
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const newsService = app.get(NewsapiService);
  const redisService = app.get(RedisService);

  const data = await newsService.fetch();
  if (data.status !== 'ok') throw new ServiceUnavailableException();

  const res = newsService.transformData(data);

  console.log(`First article saved on Redis:`);
  printNews(res, 0);

  console.log(`Second article saved on Redis:`);
  printNews(res, 2);

  redisService.save('NEWS_DATA', res);

  await app.close();
}
bootstrap();
