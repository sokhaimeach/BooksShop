import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Orderservices {
  private url = 'http://localhost:5256/api/Order/';
  constructor(private http: HttpClient){}

  GetAllOrders(){
    return this.http.get(this.url + 'GetAllOrders');
  }

  AddOrders(order: any) {
    return this.http.post(this.url + 'AddOrder', order);
  }
}
