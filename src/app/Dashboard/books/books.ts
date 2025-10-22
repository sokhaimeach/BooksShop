import { Component } from '@angular/core';
import { Book } from '../../Models/Book';
import { Bookservice } from '../../Services/bookservice';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books {
  books: Book[] = [];
  constructor(private bookservice: Bookservice){}

  ngOnInit(): void{
    this.bookservice.GetAllBook().subscribe((re: any) => {
      this.books = re
      console.log(this.books)
    });
  }
}
