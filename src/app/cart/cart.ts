import { Component } from '@angular/core';
import { Cartservice } from '../Services/cartservice';
import { CommonModule } from '@angular/common';
import { Orderservices } from '../Services/orderservices';
import { Userservices } from '../Services/userservices';
import { RouterLink } from '@angular/router';
declare let Swal: any;

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  constructor(
    public cart: Cartservice,
    private orderservice: Orderservices,
    private user: Userservices
  ) {
    this.cart.closeNav.set('flex');
  }

  CheckOut() {
    if(this.user.GetId() === ''){
      alert('Please login to order');
      return;
    }
    if(this.cart.bookCart().length===0){
      alert('You have to add book to cart first!');
      return;
    }

    let bookList = [];
    let totalPrice = 0;
    for(let i = 0; i < this.cart.bookCart().length; i++){
      bookList.push({
        bookId: this.cart.bookCart()[i].id,
        quantity: this.cart.bookCart()[i].quantity
      });
      totalPrice += this.cart.bookCart()[i].subTotal
    }
    const order = {
      userId: this.user.GetId(),
      orderDate: new Date(),
      total: totalPrice,
      orderList: bookList
    }

    this.orderservice.AddOrders(order).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Order complited!',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        this.cart.bookCart.set([]);
      }, 1500);
    });
  }

  totalBookPrice() {
    return this.cart.bookCart().reduce((sum, book) => sum + book.subTotal, 0);
  }

  bookQty(){
    return this.cart.bookCart().reduce((sum, book) => sum + book.quantity, 0);
  }
}
