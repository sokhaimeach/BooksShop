import { Component, signal } from '@angular/core';
import { User } from '../../Models/User';
import { Userservices } from '../../Services/userservices';
import { FormsModule } from '@angular/forms';
declare let Swal: any;

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: '../books/books.css',
})
export class Users {
  users = signal<User[]>([]);
  item: any = {
    id: '',
    name: '',
    imageUrl: '',
    password: '',
    role: 'User',
    email: '',
    description: '',
  };
  isUpdate: boolean = false;
  constructor(private userservice: Userservices) {}
  ngOnInit(): void {
    this.GetAll();
  }
  // get all users
  GetAll() {
    this.userservice.GetAllUsers().subscribe((re: any) => {
      this.users.set(re);
    });
  }
  // delete user
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
        this.userservice.DeleteUser(id).subscribe(() => {
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
  Insert() {
    let { id: _, ...newUser } = this.item;
    this.userservice.AddUser(newUser).subscribe((re) => {
      this.GetAll();
      this.ClearItem();
    });
  }
  // Update author
  Update() {
    this.userservice.UpdateUser(this.item).subscribe(() => {
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
  search(name: string) {
    let cope = this.users();
    if (name == '') {
      this.GetAll();
      return;
    }
    this.users.set(
      cope.filter((au) => au.name.toLowerCase().includes(name.toLowerCase()))
    );
  }

  // Clear item
  ClearItem() {
    this.isUpdate = false;
    this.item = {
      id: '',
      name: '',
      imageUrl: '',
      password: '',
      role: 'User',
      email: '',
      description: '',
    };
  }
  // open modal to update
  openModal(user: any) {
    this.isUpdate = true;
    this.item = {
      id: user.id,
      name: user.name,
      imageUrl: user.imageUrl,
      password: user.password,
      role: user.role,
      email: user.email,
      description: user.description,
    };
  }
}
