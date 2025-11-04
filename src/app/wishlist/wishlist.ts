import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Book } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';
import { Card } from '../card/card';

@Component({
  selector: 'app-wishlist',
  imports: [Card],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {
  books = signal<Book[]>([]);
  constructor(private bookservice: Bookservice){}
  ngOnInit(): void{
    this.GetBooks();
  }
  // get some books
  GetBooks(){
    this.bookservice.GetBooksByUserFav('68f5267c6a55b63b7064efe8').subscribe((res: any) => {
      this.books.set(res);
      setTimeout(() => this.AddDeleteBtn(), 100);
    });
  }

  // add delete button
  @ViewChild('wishList') parentCard!: ElementRef<HTMLDivElement>;
  AddDeleteBtn(){
    const parent = this.parentCard.nativeElement.children[0] as HTMLElement;
    const children = parent.getElementsByClassName('card');
    for(let i = 0; i < children.length; i++){
      const child = children[i] as HTMLDivElement;
      const btn = child.getElementsByClassName('wish-list-btn')[0] as HTMLButtonElement;
      btn.style.display = 'flex';
    }
  }
}
