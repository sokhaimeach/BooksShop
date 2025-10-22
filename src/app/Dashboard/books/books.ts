import { Component } from '@angular/core';
import { Book } from '../../Models/Book';
import { Bookservice } from '../../Services/bookservice';
declare let Swal: any;

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books: Book[] = [];
  constructor(private bookservice: Bookservice) {}

  ngOnInit(): void {
    this.bookservice.GetAllBook().subscribe((re: any) => {
      this.books = re;
      console.log(this.books);
    });
  }

  Delete(id: string) {
    Swal.fire({
      title: 'Do you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#41d630ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.bookservice
          .DeleteBook('68f90df78663ec0b53a74664')
          .subscribe(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Delete success',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  }
}
