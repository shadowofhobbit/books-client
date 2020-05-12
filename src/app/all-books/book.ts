export class Book {
  readonly id: number;
  title: string;
  author: string;
  description: string;
  year: number;
  language: string;
}

export interface SearchResult<T> {
  readonly content: [T];
  readonly page: number;
  readonly size: number;
  readonly totalElements: number;
}
