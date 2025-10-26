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

  bookimg: string[] = [
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2021/09/book-9.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2017/06/package7-1.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2017/06/package3-1.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2017/06/package5-1.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2017/06/package8-1.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2017/06/package2-1.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2017/06/package6-1.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2021/09/book-10.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2021/09/book-11.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2017/06/package5-1.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2021/09/book-12.jpg',
    'https://xtratheme.com/elementor/book-shop/wp-content/uploads/sites/69/2017/06/package4-1.jpg'
  ]
  author_id: string[] = [
    '68f5263c6a55b63b7064efe6',
    '68fad80a2e612453d59bb940',
    '68fad90a2e612453d59bb942'
  ]

  combineBook(){
    let cate = 0;
    let au = 0;
    for(let i = 0; i< this.bookimg.length; i++){
      if(cate == 5){
        cate = 0;
      }
      if(au == 3){
        au = 0;
      }
      this.item.title = 'Book number '+ (i+1);
      this.item.price = 15 + i;
      this.item.category = this.categories[cate];
      cate++;
      this.item.authorId = this.author_id[au];
      au++;
      this.item.imageUrl = this.bookimg[i];
      this.item.description = 'This is a very good book of all time';
      this.Insert();
    }
  }
}
