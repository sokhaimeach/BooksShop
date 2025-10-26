import { Component, Input } from '@angular/core';
import { Book } from '../Models/Book';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() Items: Book[] = [];
}
