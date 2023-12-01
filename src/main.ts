import { MongoService } from './mongo/mongo.service';
import { NestFactory } from '@nestjs/core';
import { ServiceUnavailableException } from '@nestjs/common';
import { AppModule } from './app.module';
import { NewsapiService } from './newsapi/newsapi.service';
import { News } from './interfaces';

function printNews(news: News) {
  const { title, source, publishedAt } = news;
  console.log(`Headline: ${title}`);
  console.log(`By: ${source.name}`);
  console.log(`Published at: ${publishedAt}`);
  console.log('\n');
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const newsService = app.get(NewsapiService);
  const mongoService = app.get(MongoService);

  const data = await newsService.fetch();
  if (data.status !== 'ok') throw new ServiceUnavailableException();

  const res = newsService.transformData(data);

  console.log(`First article fetched:`);
  printNews(res[0]);

  await mongoService.save(res);

  await app.close();
}
bootstrap();
