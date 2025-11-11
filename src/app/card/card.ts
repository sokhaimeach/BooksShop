import { Component, Input } from '@angular/core';
import { Book } from '../Models/Book';
import { RouterLink } from '@angular/router';
import { Favservice } from '../Services/favservice';
import { Userservices } from '../Services/userservices';
import { CommonModule } from '@angular/common';
import { Cartservice } from '../Services/cartservice';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() Items: Book[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(
    public fav: Favservice,
    public user: Userservices,
    public cart: Cartservice
  ) {
    this.cart.closeNav.set('flex');
  }
  // calculate average rating
  averageRating(book: any): number {
    let total = 0;
    if (book.reviews) {
      for (let i = 0; i < book.reviews.length; i++) {
        total += book.reviews[i].rate;
      }
      let avg = total / book.reviews.length;
      if (!isNaN(avg)) {
        return Math.round(avg);
      }
    }
    return 0;
  }
}
