import { Component, signal } from '@angular/core';
import { Orderservices } from '../../Services/orderservices';
import { Order } from '../../Models/Order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: '../books/books.css'
})
export class Orders {
  orders = signal<Order[]>([]);
  constructor(private orderservice: Orderservices) {}
  ngOnInit(): void {
    this.GetAll();
  }
  // get all users
  GetAll() {
    this.orderservice.GetAllOrders().subscribe((re: any) => {
      this.orders.set(re);
    });
  }
  // search
  search(name: string) {
    let cope = this.orders();
    if (name == '') {
      this.GetAll();
      return;
    }
    this.orders.set(
      cope.filter((au) => au.userName.toLowerCase().includes(name.toLowerCase()))
    );
  }
}
