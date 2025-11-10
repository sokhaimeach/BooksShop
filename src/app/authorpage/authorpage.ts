import { Component, signal } from '@angular/core';
import { Card } from '../card/card';
import { Book } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authorpage',
  imports: [Card],
  templateUrl: './authorpage.html',
  styleUrl: '../bookpage/bookpage.css'
})
export class Authorpage {
  books = signal<Book[]>([]);
  activeAuthor: string = '';
  constructor(private bookservice: Bookservice, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.activeAuthor = params['name'];
      if(id){
        this.GetBookByAuthorId(id);
      }
    });
  }

  GetBookByAuthorId(id: string){
    this.bookservice.GetBooksByAuthorId(id).subscribe((re: any) => {
      this.books.set(re);
    });
  }
}
