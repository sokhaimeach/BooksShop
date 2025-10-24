import { Component, signal } from '@angular/core';
import { Author } from '../../Models/Author';
import { FormsModule } from '@angular/forms';
import { Authorservice } from '../../Services/authorservice';
declare let Swal: any;

@Component({
  selector: 'app-authors',
  imports: [FormsModule],
  templateUrl: './authors.html',
  styleUrl: '../books/books.css'
})
export class Authors {
  authors = signal<Author[]>([]);
  item: any = {
    id: '',
    name: '',
    imageUrl: '',
    bio: ''
  }
  isUpdate: boolean = false;
  constructor(private authorservice: Authorservice){}
  ngOnInit(): void{
    this.GetAll();
  }
  // get all authors
  GetAll(){
    this.authorservice.GetAllAuthors().subscribe((re: any) => {
      this.authors.set(re);
    });
  }
  // delete author
  Delete(id: string){
    Swal.fire({
      title: 'Do you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#41d630ff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.authorservice.DeleteAuthor(id).subscribe(() => {
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
  // add new author
  Insert(){
    let {id: _, ...newAuthor} = this.item;
    this.authorservice.AddAuthor(newAuthor).subscribe((re) => {
      this.GetAll();
      this.ClearItem();
    });
  }
  // Update author
  Update(){
    this.authorservice.UpdateAuthor(this.item).subscribe(() => {
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
  // search
  search(name: string){
    let cope = this.authors();
    if(name==''){
      this.GetAll();
      return;
    }
    this.authors.set(cope.filter(au => au.name.toLowerCase().includes(name.toLowerCase())));
  }


  // Clear item
  ClearItem(){
    this.item = {
    id: '',
    name: '',
    imageUrl: '',
    bio: ''
  }
  }
  // open modal to update
  openModal(author: any){
    this.isUpdate = true;
    this.item = {
      id: author.id,
      name: author.name,
      imageUrl: author.imageUrl,
      bio: author.bio
    }
  }
}
