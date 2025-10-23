import { Component, signal } from '@angular/core';
import { Book } from '../../Models/Book';
import { Bookservice } from '../../Services/bookservice';
import { FormsModule } from '@angular/forms';
import { Author } from '../../Models/Author';
import { Authorservice } from '../../Services/authorservice';
import { CommonModule } from '@angular/common';
declare let Swal: any;

@Component({
  selector: 'app-books',
  imports: [FormsModule, CommonModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books = signal<Book[]>([]);
  authors: Author[] = [];
  categories: string[] = [
    'Classic',
    'Historical',
    'Economice',
    'Comic Book',
    'Action',
  ];
  item: any = {
    id: '',
    title: '',
    price: 0,
    category: '',
    authorId: '',
    imageUrl: '',
    description: '',
    publishDate: '',
    favorite: [],
    reviews: [
      {
        userId: '',
        comment: '',
        rate: 0,
      },
    ],
  };
  isUpdate: boolean = false;

  constructor(
    private bookservice: Bookservice,
    private authorservice: Authorservice
  ) {}
  ngOnInit(): void {
    this.GetAll();
    this.GetAuthor();
  }
  // get all books
  GetAll() {
    this.bookservice.GetAllBook().subscribe((re: any) => {
      this.books.set(re);
    });
  }
  // delete book by id
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
        this.bookservice.DeleteBook(id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Delete success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.GetAll();
        });
      }
    });
  }
  // add new book
  Insert() {
    let { id: _, ...newBook } = this.item;
    newBook.publishDate = new Date();
    this.bookservice.AddBook(newBook).subscribe((re) => {
      this.GetAll();
      this.ClearItem();
    });
  }
  // update book
  Update() {
    this.bookservice.UpdateBook(this.item).subscribe((re) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Update success',
        showConfirmButton: false,
        timer: 1500,
      });
      this.GetAll();
    });
  }
  // search book by title
  search(title: string){
    let allbooks = this.books();
    if(title==''){
      this.GetAll();
      return;
    }
    this.books.set(allbooks.filter((book: any) => book.title.toLowerCase().includes(title.toLowerCase())));
  }



  // get all authors
  GetAuthor() {
    this.authorservice
      .GetAllAuthors()
      .subscribe((re: any) => (this.authors = re));
  }
  // reset item
  ClearItem() {
    this.item = {
      id: '',
      title: '',
      price: 0,
      category: '',
      authorId: '',
      imageUrl: '',
      description: '',
      publishDate: '',
      favorite: [],
      reviews: [
        {
          userId: '',
          comment: '',
          rate: 0,
        },
      ],
    };
  }
  // open modal to update
  openModal(book: any) {
    this.isUpdate = true;
    this.item = {
      id: book.id,
      title: book.title,
      price: book.price,
      category: book.category,
      authorId: book.authorId,
      imageUrl: book.imageUrl,
      description: book.description,
      publishDate: book.publishDate,
      favorite: book.favorite,
      reviews: book.reviews,
    };
  }
  // report total
  total() {
    return this.books().reduce((acc, book) => acc + book.price, 0);
  }
}
