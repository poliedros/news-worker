export interface News {
  headline: string;
  publishedAt: Date;
  by: string;
}

export interface Source {
  id: string;
  name: string;
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
