import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Article, News, NewsApiResponse } from './../interfaces';

@Injectable()
export class NewsapiService {
  constructor(private readonly httpService: HttpService) {}

  // TODO: this http request has to reprocress if it fails (401 for example)
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
    return data.articles.map((article: Article) => {
      return article;
    });
  }
}
