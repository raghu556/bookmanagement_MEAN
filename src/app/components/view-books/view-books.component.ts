import { Component, OnInit } from '@angular/core';
import { BooksRestService } from './../../services/books-rest.service';
import { Book } from './../../model/book';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBooksComponent implements OnInit {
  books: Book[];
  constructor(private booksRestService: BooksRestService) { }

  ngOnInit(): void {
    this.booksRestService.viewBooks().subscribe(data => {
      if (data) {
        this.books = data.booksData;
      }
    });
  }


}
