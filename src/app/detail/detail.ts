import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Card } from '../card/card';
import { Book, BookDetail } from '../Models/Book';
import { Bookservice } from '../Services/bookservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Userservices } from '../Services/userservices';
import { Favservice } from '../Services/favservice';
import { Cartservice } from '../Services/cartservice';

@Component({
  selector: 'app-detail',
  imports: [RouterLink, Card, CommonModule, FormsModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  books = signal<Book[]>([]);
  bookDetail = signal<BookDetail>({} as BookDetail);
  heart = signal<string>('bi-heart');
  stars: number[] = [1, 2, 3, 4, 5];
  rating: string[] = ['bi-star', 'bi-star', 'bi-star', 'bi-star', 'bi-star'];
  quantity: number = 0;
  review: any = {
    userId: '',
    comment: '',
    rate: 0
  };
  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;
  constructor(
    private bookservice: Bookservice,
    private route: ActivatedRoute,
    public userservice: Userservices,
    public fav: Favservice,
    private cart: Cartservice) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      const category = params['category'];
      if (id) {
        this.GetRelatedBooks(id, category);
        this.GetDetail(id);
        window.scrollTo({top: 0, behavior: 'smooth'});
        const bookFromCart = this.cart.bookCart().find(b => b.id === id);
        if (bookFromCart !== undefined){
          this.quantity = bookFromCart.quantity;
        } else this.quantity = 0;
      }
    });
    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get('id');
      
    // });
  }
  // get book details
  GetDetail(id: string) {
    this.bookservice.GetBookById(id).subscribe((re: any) => {
      this.bookDetail.set(re);
      const ishave = this.bookDetail().favorite.find((b: any) => b === this.userservice.GetId()) || null;
        if(ishave !== null){
          this.heart.set('bi-heart-fill text-danger');
        } else{
          this.heart.set('bi-heart');
        }
    });
  }

  // get all books
  GetRelatedBooks(id: string, cate: string) {
    this.bookservice.GetRelateProduct(id, cate).subscribe((re: any) => {
      this.books.set(re);
    });
  }

  // calculate average rating
  averageRating(): number {
    let total = 0;
    if(this.bookDetail().reviewerInfo){  
      for(let i = 0; i < this.bookDetail().reviewerInfo.length; i++){
        total += this.bookDetail().reviewerInfo[i].rate;
      }
      let avg = total / this.bookDetail().reviewerInfo.length;
      if(!isNaN(avg)){
        return Math.round(avg);
      }
    }
    return 0;
  }

  // add user comment
  AddComment() {
    this.review.userId = this.userservice.GetId();
    if(this.review.userId === ''){
      alert('Please login to add a review.');
      return;
    }
    if(this.review.comment === '' || this.review.rate === 0){
      alert('Please enter your review comment.');
      return;
    }   
    this.bookservice.UpdateBook(this.updateBook()).subscribe((re: any) => {
      console.log('Your review has been added successfully.');
      this.GetDetail(this.bookDetail().id);
      this.review = {
        userId: this.userservice.GetId(),
        comment: '',
        rate: 0
      };
      this.fillRating(0);
    });
  }

  // set rating stars
  fillRating(rate: number) {
    for (let i = 0; i < this.rating.length; i++) {
      if (i < rate) {
        this.rating[i] = 'bi-star-fill';
      } else {
        this.rating[i] = 'bi-star';
      }
    }
  }
  setRating(rate: number) {
    this.review.rate = rate;
  }

  // update book
  updateBook(): any{
    let revs: any[] = [];
    for(let i = 0; i < this.bookDetail().reviewerInfo.length; i++){
      if(this.bookDetail().reviewerInfo[i].id !== ''){
        revs.push({
          userId: this.bookDetail().reviewerInfo[i].id,
          comment: this.bookDetail().reviewerInfo[i].comment,
          rate: this.bookDetail().reviewerInfo[i].rate
        });
      }
    }
    revs.push(this.review);
    console.log(revs);
    const item = {
      id: this.bookDetail().id,
      title: this.bookDetail().title,
      price: this.bookDetail().price,
      category: this.bookDetail().category,
      authorId: this.bookDetail().authorInfo.id,
      imageUrl: this.bookDetail().imageUrl,
      description: this.bookDetail().description,
      publishDate: this.bookDetail().publishDate,
      favorite: this.bookDetail().favorite,
      reviews: revs,
    };
    return item;
  }
  // add to cart 
  AddToCartFromDetail(){
    if(this.quantity===0){
      this.quantity++;
    }
    this.cart.AddToCart(this.updateBook(), this.quantity);
  }

  // increase quantity
  IncreaseQuantity(){
    this.quantity++;
    this.cart.Increase(this.bookDetail().id);
    const bookFromCart = this.cart.bookCart().find(b => b.id === this.bookDetail().id);
    if (bookFromCart !== undefined){
      this.quantity = bookFromCart.quantity;
    }
  }
  // decrease quantyty
  DecreaseQuantyty() {
    this.quantity--;
    if(this.quantity <= 0){
      this.quantity = 0;
      this.cart.DeleteFromCart(this.bookDetail().id);
      return;
    }
    this.cart.Decrease(this.bookDetail().id);
    const bookFromCart = this.cart.bookCart().find(b => b.id === this.bookDetail().id);
    if (bookFromCart !== undefined){
      this.quantity = bookFromCart.quantity;
    }
  }




  // toggle detail heart
  toggleDetailHeart(){
    this.fav.ToggleWishList(this.updateBook());
    setTimeout(() => {
      this.GetDetail(this.bookDetail().id)
    }, 50);
  }

  // scroll to review section
  scrollToReview(element: HTMLElement){
    element.scrollIntoView({behavior: 'smooth', block: 'nearest'})
  }


  scrollLeft() {
    const s = this.slider.nativeElement.children[0] as HTMLElement;
    let child = s.getElementsByClassName('card');
    for (let i = 0; i < child.length; i++) {
      let element = child[i] as HTMLElement;
      element.style.scrollSnapAlign = 'start';
    }
    const childWhith = s.getElementsByClassName('card')[0] as HTMLElement;
    s.scrollBy({ left: -childWhith.clientWidth, behavior: 'smooth' });
  }

  scrollRight() {
    const s = this.slider.nativeElement.children[0] as HTMLElement;
    let child = s.getElementsByClassName('card');
    for (let i = 0; i < child.length; i++) {
      let element = child[i] as HTMLElement;
      element.style.scrollSnapAlign = 'end';
    }
    const childWhith = s.getElementsByClassName('card')[0] as HTMLElement;
    s.scrollBy({ left: childWhith.clientWidth, behavior: 'smooth' });
  }

  // toggle reviews box
  @ViewChild('list1') list1!: ElementRef<HTMLElement>;
  @ViewChild('list2') list2!: ElementRef<HTMLElement>;
  @ViewChild('list3') list3!: ElementRef<HTMLElement>;
  display1 = 'flex';
  display2 = 'none';
  display3 = 'none';
  toggleReviewsBox(boxNumber: number) {
    if (boxNumber === 1) {
      this.display1 = 'flex';
      this.display2 = 'none';
      this.display3 = 'none';
      this.list1.nativeElement.classList.add('active');
      this.list2.nativeElement.classList.remove('active');
      this.list3.nativeElement.classList.remove('active');
    } else if (boxNumber === 2) {
      this.display1 = 'none';
      this.display2 = 'flex';
      this.display3 = 'none';
      this.list1.nativeElement.classList.remove('active');
      this.list2.nativeElement.classList.add('active');
      this.list3.nativeElement.classList.remove('active');
    } else if (boxNumber === 3) {
      this.display1 = 'none';
      this.display2 = 'none';
      this.display3 = 'flex';
      this.list1.nativeElement.classList.remove('active');
      this.list2.nativeElement.classList.remove('active');
      this.list3.nativeElement.classList.add('active');
    }
  }
}
