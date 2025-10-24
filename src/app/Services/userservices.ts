import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Userservices {
  private url: string = 'http://localhost:5256/api/User/';
  constructor(private http: HttpClient){}

  GetAllUsers(){
    return this.http.get(this.url+'GetAllUsers');
  }

  DeleteUser(id: string){
    return this.http.delete(this.url + 'DeleteUser/' +id);
  }

  AddUser(user: any){
    return this.http.post(this.url + 'AddUser', user);
  }

  UpdateUser(user: any){
    return this.http.put(this.url + 'UpdateUser', user);
  }
}
