import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Book } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';
import { Card } from '../card/card';
import { Userservices } from '../Services/userservices';
import { Favservice } from '../Services/favservice';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-wishlist',
  imports: [Card, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  constructor(
    private bookservice: Bookservice,
    private userservice: Userservices,
    public fav: Favservice
  ) {}
  ngOnInit(): void {
    try{
      this.fav.GetBooks();
      setTimeout(() => this.AddDeleteBtn(), 100);
    } catch{}
  }

  // add delete button
  @ViewChild('wishList') parentCard!: ElementRef<HTMLDivElement>;
  AddDeleteBtn() {
    if(!this.parentCard) return;
    const parent = this.parentCard.nativeElement.children[0] as HTMLElement;
    const children = parent.getElementsByClassName('card');
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLDivElement;
      const btn = child.getElementsByClassName(
        'wish-list-btn'
      )[0] as HTMLButtonElement;
      btn.style.display = 'flex';
    }
  }
}
