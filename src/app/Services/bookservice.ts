import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root'
})
export class Bookservice {
  private url = 'http://localhost:5256/api/Book/';
  constructor(private http: HttpClient){}

  GetAllBook(){
    return this.http.get<Book>(this.url + 'GetAllBook');
  }

  DeleteBook(id: string){
    return this.http.delete(this.url + "DeleteBook/" + id);
  }

  AddBook(book: any){
    return this.http.post(this.url + 'AddBook', book);
  }

  UpdateBook(book: any){
    return this.http.put(this.url + 'UpdateBook', book);
  }

  GetBooksByAuthorId(id: string){
    return this.http.get(this.url + 'GetBooksByAuthorId/' + id);
  }

  GetBooksByCategory(category: string){
    return this.http.get(this.url + 'GetBooksByCategory/' + category);
  }

  GetBookById(id: string){
    return this.http.get(this.url + 'GetOneBook/' + id);
  }

  GetBooksByUserFav(userId: string){
    return this.http.get(this.url + 'GetByUserFav/' + userId);
  }

  GetMostSellBook(){
    return this.http.get(this.url + 'GetBestSeller');
  }

  GetRelateProduct(id: string, cate: string){
    return this.http.get(this.url + 'GetRelated/' + id + '/' + cate);
  }
}
