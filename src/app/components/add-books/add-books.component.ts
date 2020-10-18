import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksRestService } from 'src/app/services/books-rest.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit {
  form: FormGroup;
  constructor(
    private booksRestService: BooksRestService,
    private router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl(''),
      author: new FormControl(''),
      isbn: new FormControl(''),
      price: new FormControl('')
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.booksRestService.addBook(this.form.value).subscribe(o => {
      this.router.navigate(['/viewBook']);
      console.log(o);
    });
  }

}
