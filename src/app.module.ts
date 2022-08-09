import { Module } from '@nestjs/common';
import { NewsapiModule } from './newsapi/newsapi.module';

@Module({
  imports: [NewsapiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
