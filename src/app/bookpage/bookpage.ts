import { Component, signal } from '@angular/core';
import { Book } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';
import { Card } from '../card/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bookpage',
  imports: [Card, RouterLink],
  templateUrl: './bookpage.html',
  styleUrl: './bookpage.css'
})
export class Bookpage {
  books = signal<Book[]>([]);
  constructor(private bookservice: Bookservice){}

  ngOnInit(): void{
    this.GetAllBooks();
  }

  GetAllBooks(){
    this.bookservice.GetAllBook().subscribe((re: any) => {
      this.books.set(re);
    });
  }
}
