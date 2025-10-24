import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Authorservice {
  private url: string = 'http://localhost:5256/api/Author/';
  constructor(private http: HttpClient){}

  GetAllAuthors(){
    return this.http.get(this.url + 'GetAllAuthors');
  }

  AddAuthor(author: any){
    return this.http.post(this.url + 'AddAuthor', author);
  }

  DeleteAuthor(id: string){
    return this.http.delete(this.url + 'DeleteAuthor/' + id);
  }

  UpdateAuthor(author: any){
    return this.http.put(this.url + 'UpdateAuthor', author);
  }
}
