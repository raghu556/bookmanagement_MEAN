import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BooksResponseData } from './../model/book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksRestService {

  constructor(private http: HttpClient) { }

  addBook(book: Book): Observable<Book[]> {
    return this.http.post<Book[]>(`${environment.restBaseUrl}/addBook`, book);
  }

  viewBooks(): Observable<BooksResponseData> {
    return this.http.get<BooksResponseData>(`${environment.restBaseUrl}/books`);
  }
}
