import { Module } from '@nestjs/common';
import { NewsapiModule } from './newsapi/newsapi.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [NewsapiModule, MongoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
