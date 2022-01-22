export interface IBook {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  price: number;
}

export interface IBookObject extends IBook {
  id: string;
}
