export class Review {
  id?: number;
  date: string;
  title?: string;
  constructor(readonly bookId: number,
              readonly reviewerId: number,
              public rating: number,
              public content: string) {
  }
}
