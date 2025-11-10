import { Component, signal } from '@angular/core';
import { Book } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';
import { Card } from '../card/card';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorypage',
  imports: [Card, RouterLink],
  templateUrl: './categorypage.html',
  styleUrl: '../bookpage/bookpage.css'
})
export class Categorypage {
  books = signal<Book[]>([]);
  activePage: string = '';
  constructor(private bookservice: Bookservice, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');
      if(category){
        this.GetAllBooks(category);
        this.activePage = category;
      }
    })
  }

  GetAllBooks(category: string){
    this.bookservice.GetBooksByCategory(category).subscribe((re: any) => {
      this.books.set(re);
    });
  }
}
