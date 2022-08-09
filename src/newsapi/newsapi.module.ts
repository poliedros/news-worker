import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { NewsapiService } from './newsapi.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [NewsapiService],
})
export class NewsapiModule {}
