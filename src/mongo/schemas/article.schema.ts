import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop()
  headline: string;

  @Prop()
  by: string;

  @Prop()
  publishedAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
