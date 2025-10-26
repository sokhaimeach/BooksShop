import { Component, signal } from '@angular/core';
import { Card } from '../card/card';
import { Book } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';

@Component({
  selector: 'app-authorpage',
  imports: [Card],
  templateUrl: './authorpage.html',
  styleUrl: '../bookpage/bookpage.css'
})
export class Authorpage {
  books = signal<Book[]>([]);
  constructor(private bookservice: Bookservice){}

  ngOnInit(): void{
    this.GetAllBooks();
  }

  GetAllBooks(){
    this.bookservice.GetBooksByAuthorId('68fad80a2e612453d59bb940').subscribe((re: any) => {
      this.books.set(re);
    });
  }
}
