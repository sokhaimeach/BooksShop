import { Component, signal } from '@angular/core';
import { Book } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';
import { Card } from '../card/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorypage',
  imports: [Card, RouterLink],
  templateUrl: './categorypage.html',
  styleUrl: '../bookpage/bookpage.css'
})
export class Categorypage {
  books = signal<Book[]>([]);
  constructor(private bookservice: Bookservice){}

  ngOnInit(): void{
    this.GetAllBooks();
  }

  GetAllBooks(){
    this.bookservice.GetBooksByCategory('Historical').subscribe((re: any) => {
      this.books.set(re);
    });
  }
}
