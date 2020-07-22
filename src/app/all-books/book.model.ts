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

export class BookInvoice {
  id?: number;
  title: string;
  author?: string;
  description?: string;
  year?: number;
  language?: string;

  constructor(title: string, id?: number, author?: string, description?: string, year?: number, language?: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.year = year;
    this.language = language;
  }
}
