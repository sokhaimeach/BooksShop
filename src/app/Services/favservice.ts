import { Injectable, signal } from '@angular/core';
import { Bookservice } from './bookservice';
import { Userservices } from './userservices';
import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root'
})
export class Favservice {
  books = signal<Book[]>([]);
  constructor(private bookservice: Bookservice, private userservice: Userservices){}
  // get some books
  GetBooks(){
    if(this.userservice.GetId() == '') return;
    this.bookservice.GetBooksByUserFav(this.userservice.GetId()).subscribe((res: any) => {
      this.books.set(res);
    });
  }
 // delete
  DeleteWishList(book: any){
    if(this.userservice.GetId() === '') return;
    const newBook = book.favorite.filter((b: any) => b !== this.userservice.GetId());
    book.favorite = newBook;
    this.bookservice.UpdateBook(book).subscribe(() => {
      this.GetBooks();
    });
  }
  // toggle wishList
  ToggleWishList(book: any){
    if(this.userservice.GetId() === '') return;
    const ishave = book.favorite.find((b: any) => b === this.userservice.GetId()) || null;
    if(ishave===null){
      book.favorite.push(this.userservice.GetId());
      this.bookservice.UpdateBook(book).subscribe(() => {
        this.GetBooks();
      });
    } else {
      this.DeleteWishList(book);
    }
  }
  // toggle icon
  ToggleIcon(fav: Array<string>){
    let heart = 'bi-heart';
    const ishave = fav.find((b) => b === this.userservice.GetId()) || null;
    if(ishave !== null){
      heart = 'bi-heart-fill text-danger';
    }
    return heart;
  }
}
