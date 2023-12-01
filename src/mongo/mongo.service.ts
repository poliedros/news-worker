import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { News } from './../interfaces';

@Injectable()
export class MongoService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  async save(data: News[]) {
    let savedDocs = 0;

    console.log(`Saving ${data.length} documents to Mongodb...`);

    for (const article of data) {
      const articleModel = new this.articleModel(article);

      try {
        await this.articleModel.insertMany(articleModel);
        savedDocs += 1;
      } catch (e) {}
    }

    console.log(`Saved ${savedDocs} documents to Mongodb...`);

    console.log('Saved!');
  }
}
