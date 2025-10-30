import { AfterViewInit, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../card/card';
import { Book } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';

@Component({
  selector: 'app-detail',
  imports: [RouterLink, Card],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail {
  books = signal<Book[]>([]);
  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;
  constructor(private bookservice: Bookservice){}
  ngOnInit(): void{
    this.GetBookDetail();
  }
  // get all books
  GetBookDetail() {
    this.bookservice.GetAllBook().subscribe((re: any) => {
      this.books.set(re);
    });
  }

  scrollLeft() {
    const s = this.slider.nativeElement.children[0] as HTMLElement;
    let child = s.getElementsByClassName('card');
    for (let i = 0; i < child.length; i++) {
      let element = child[i] as HTMLElement;
      element.style.scrollSnapAlign = 'start';
    }
    const childWhith = s.getElementsByClassName('card')[0] as HTMLElement;
    s.scrollBy({ left: -(childWhith.clientWidth ), behavior: 'smooth' });
  }

  scrollRight() {
    const s = this.slider.nativeElement.children[0] as HTMLElement;
    let child = s.getElementsByClassName('card');
    for (let i = 0; i < child.length; i++) {
      let element = child[i] as HTMLElement;
      element.style.scrollSnapAlign = 'end';
    }
    const childWhith = s.getElementsByClassName('card')[0] as HTMLElement;
    s.scrollBy({ left: (childWhith.clientWidth ), behavior: 'smooth' });
  }

  // toggle reviews box
  @ViewChild('list1') list1!: ElementRef<HTMLElement>;
  @ViewChild('list2') list2!: ElementRef<HTMLElement>;
  @ViewChild('list3') list3!: ElementRef<HTMLElement>;
  display1 = 'flex';
  display2 = 'none';
  display3 = 'none';
  toggleReviewsBox(boxNumber: number) {
    if(boxNumber === 1) {
      this.display1 = 'flex';
      this.display2 = 'none';
      this.display3 = 'none';
      this.list1.nativeElement.classList.add('active');
      this.list2.nativeElement.classList.remove('active');
      this.list3.nativeElement.classList.remove('active');
    } else if(boxNumber === 2) {
      this.display1 = 'none';
      this.display2 = 'flex';
      this.display3 = 'none';
      this.list1.nativeElement.classList.remove('active');
      this.list2.nativeElement.classList.add('active');
      this.list3.nativeElement.classList.remove('active');
    } else if(boxNumber === 3) {
      this.display1 = 'none';
      this.display2 = 'none';
      this.display3 = 'flex';
      this.list1.nativeElement.classList.remove('active');
      this.list2.nativeElement.classList.remove('active');
      this.list3.nativeElement.classList.add('active');
    }
  }
}
