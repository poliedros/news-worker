import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Source } from '../../interfaces';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ type: Object })
  source: Source;

  @Prop()
  author: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  url: string;

  @Prop()
  urlToImage: string;

  @Prop()
  publishedAt: Date;

  @Prop()
  content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
