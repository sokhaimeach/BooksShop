import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cartservice {
  bookCart = signal<any[]>([]);

  AddToCart(book: any, qty: number) {
    if((this.bookCart().find((b: any) => b.id === book.id) || null) !== null) return;
    let newBook = {
      id: book.id,
      title: book.title,
      imageUrl: book.imageUrl,
      price: book.price,
      quantity: qty,
      subTotal: book.price
    }
    this.bookCart().push(newBook);
  }
  DeleteFromCart(id: string){
    const books = this.bookCart().filter((b: any) => b.id !== id);
    this.bookCart.set(books);
  }
  Increase(id: string) {
    let book = this.bookCart().find((b: any) => b.id === id);
    if(!book) return;
    book.quantity++;
    book.subTotal = book.price * book.quantity;
  }
  Decrease(id: string){
    let book = this.bookCart().find((b: any) => b.id === id);
    if(!book) return;
    if(book.quantity === 1) return;
    book.quantity--;
    book.subTotal = book.price * book.quantity;
  }
}
