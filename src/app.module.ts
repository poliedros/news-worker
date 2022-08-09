import { Module } from '@nestjs/common';
import { NewsapiModule } from './newsapi/newsapi.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [NewsapiModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
