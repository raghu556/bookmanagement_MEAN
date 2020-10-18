export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  price: string;
  reviews: Reviews;
}

export interface Reviews {
  _id: string;
  reviewername: string;
  comments: string;
  rating: number;
}

export interface BooksResponseData {
  name: string;
  booksData: Book[];
  userRating: string[]
}
