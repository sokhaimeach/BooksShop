import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail',
  imports: [RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail {

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
