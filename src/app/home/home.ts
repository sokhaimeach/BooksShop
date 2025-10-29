import { Component, signal } from '@angular/core';
import { Card } from '../card/card';
import { Book } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';
import { Authorservice } from '../Services/authorservice';
import { Author } from '../Models/Author';

@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  books = signal<Book[]>([]);
  authors = signal<Author[]>([]);
  constructor(private bookservice: Bookservice, private authorservice: Authorservice){}
  ngOnInit(): void{
    this.GetAll();
    this.GetAuthors();
  }

  // get all books
  GetAll() {
    this.bookservice.GetAllBook().subscribe((re: any) => {
      this.books.set(re)

    });
  }
  // get authors
  GetAuthors(){
    this.authorservice.GetAllAuthors().subscribe((res: any) => {this.authors.set(res)});
  }
}
