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
}
