import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisService } from './redis/redis.service';
import { NewsapiService } from './newsapi/newsapi.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const newsService = app.get(NewsapiService);
  const redisService = app.get(RedisService);

  const res = await newsService.fetch();
  redisService.save(res);

  await app.close();
}
bootstrap();
