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
    console.log(`Deleting all documents on the collection...`);
    await this.articleModel.deleteMany({});
    console.log('Deleted');

    console.log(`Saving ${data.length} documents to Mongodb...`);

    const articleModels = [];
    for (const { headline, by, publishedAt } of data) {
      const articleModel = new this.articleModel({ headline, by, publishedAt });
      articleModels.push(articleModel);
    }

    await this.articleModel.bulkSave(articleModels);
    console.log('Saved');
  }
}
