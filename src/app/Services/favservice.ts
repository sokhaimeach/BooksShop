import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Favservice {
 // delete
  DeleteWishList(book: any){
    console.log('After delete : ', book);
  } 
}
