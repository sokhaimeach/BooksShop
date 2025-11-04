import { Component, Input } from '@angular/core';
import { Book } from '../Models/Book';
import { RouterLink } from "@angular/router";
import { Favservice } from '../Services/favservice';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() Items: Book[] = [];
  constructor(public fav: Favservice) {
    
  }
}
