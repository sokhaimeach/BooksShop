import { Component, signal } from '@angular/core';
import { Card } from '../card/card';
import { Book } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';
import { Authorservice } from '../Services/authorservice';
import { Author } from '../Models/Author';
import { RouterLink } from "@angular/router";
import { Cartservice } from '../Services/cartservice';

@Component({
  selector: 'app-home',
  imports: [Card, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  books = signal<Book[]>([]);
  authors = signal<Author[]>([]);
  categoriesList: any[] = [
    {title: 'Action', pic: 'books1.png', color: '#105372'},
    {title: 'Classic', pic: 'books2.png', color: '#26292a'},
    {title: 'Historical', pic: 'books3.png', color: '#ff6600'},
    {title: 'Comic Book', pic: 'books4.png', color: '#758bfd'},
    {title: 'Economice', pic: 'books5.png', color: '#ae3535ff'}
  ];
  constructor(private bookservice: Bookservice, private authorservice: Authorservice, private cart: Cartservice){}
  ngOnInit(): void{
    this.GetAll();
    this.GetAuthors();
    this.cart.closeNav.set('flex');
  }

  // get all books
  GetAll() {
    this.bookservice.GetMostSellBook().subscribe((re: any) => {
      this.books.set(re)

    });
  }
  // get authors
  GetAuthors(){
    this.authorservice.GetAllAuthors().subscribe((res: any) => {this.authors.set(res)});
  }
}
