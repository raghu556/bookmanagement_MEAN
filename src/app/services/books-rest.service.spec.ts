/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BooksRestService } from './books-rest.service';

describe('Service: BooksRest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksRestService]
    });
  });

  it('should ...', inject([BooksRestService], (service: BooksRestService) => {
    expect(service).toBeTruthy();
  }));
});
