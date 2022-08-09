import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NewsapiService {
  constructor(private readonly httpService: HttpService) {}

  async fetch() {
    const res = await firstValueFrom(
      this.httpService.get('https://newsapi.org/v2/top-headlines', {
        params: {
          apiKey: process.env.NEWS_API_KEY,
          country: process.env.COUNTRY,
          category: process.env.CATEGORY,
        },
      }),
    );

    return res.data;
  }
}
