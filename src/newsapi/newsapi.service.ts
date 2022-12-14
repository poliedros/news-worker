import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Article, News, NewsApiResponse } from './../interfaces';

@Injectable()
export class NewsapiService {
  constructor(private readonly httpService: HttpService) {}

  async fetch() {
    const res = await firstValueFrom(
      this.httpService.get<NewsApiResponse>(
        'https://newsapi.org/v2/top-headlines',
        {
          params: {
            apiKey: process.env.NEWS_API_KEY,
            country: process.env.COUNTRY,
            category: process.env.CATEGORY,
          },
        },
      ),
    );

    return res.data;
  }

  transformData(data: NewsApiResponse): News[] {
    return data.articles.map(({ title, source, publishedAt }: Article) => {
      const news: News = {
        headline: title,
        by: source.name,
        publishedAt: publishedAt,
      };
      return news;
    });
  }
}
