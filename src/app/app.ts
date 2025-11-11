import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Userservices } from './Services/userservices';
import { User } from './Models/User';
import { Cartservice } from './Services/cartservice';
import { Favservice } from './Services/favservice';
import { Authorservice } from './Services/authorservice';
import { Author } from './Models/Author';
declare let Swal: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'BookShop';
  authors = signal<Author[]>([]);
  users: User[] = [];
  loginId = signal('');
  loginRole = signal('');
  categories: string[] = [
    'Classic',
    'Historical',
    'Economice',
    'Comic Book',
    'Action',
  ];
  constructor(private userservice: Userservices, public cart: Cartservice, public fav: Favservice, private authorservice: Authorservice){}
  ngOnInit(): void{
    this.GetUsers();
    this.GetAuthors();
    try{
      this.loginId.set(sessionStorage.getItem('loginId') || '');
      this.userservice.Login(this.loginId());
      this.loginRole.set(sessionStorage.getItem('Role') || '');
    } catch{
      this.loginId.set('');
      this.userservice.Login('');
      this.loginRole.set('');
    }
  }
  // get all users
  GetUsers() {
    this.userservice.GetAllUsers().subscribe((res: any) => {this.users = res;});
  }
  // get authors
  GetAuthors(){
    this.authorservice.GetAllAuthors().subscribe((res: any) => {this.authors.set(res)});
  }
  // check login
  @ViewChild('loginName') inputName!: ElementRef <HTMLInputElement>;
  @ViewChild('loginPass') inputPass!: ElementRef <HTMLInputElement>;
  @ViewChild('alert') alertWrong!: ElementRef <HTMLElement>;
  checkLogin(name: HTMLInputElement, password: HTMLInputElement, alert: HTMLElement){
    if(name.value === '' && password.value === ''){
      name.style.outline = '1px solid red';
      password.style.outline = '1px solid red';
      alert.style.display = 'none';
      setTimeout(() => alert.style.display = 'flex', 50);
      alert.textContent = 'Please fill username and password';
    } else if(name.value === '' && password.value !== '') {
      alert.style.display = 'none';
      setTimeout(() => alert.style.display = 'flex', 50);
      alert.textContent = 'Please fill username';
      name.style.outline = '1px solid red';
      password.style.outline = 'none';
    } else if (name.value !== '' && password.value === ''){
      alert.style.display = 'none';
      setTimeout(() => alert.style.display = 'flex', 50);
      alert.textContent = 'Please fill password';
      name.style.outline = 'none';
      password.style.outline = '1px solid red';
    } else{
      alert.style.display = 'none';
      name.style.outline = 'none';
      password.style.outline = 'none';
      const found = this.users
      .find((user) => 
        (user.name === name.value && user.password === password.value)) || null;
  
      if(found==null){
        name.style.outline = '1px solid red';
        password.style.outline = '1px solid red';
        alert.style.display = 'none';
        setTimeout(() => alert.style.display = 'flex', 50);
        alert.textContent = 'Username or password is not correct, please try again';
      } else {
        Swal.fire({
          title: "Welcome " + found.name,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        sessionStorage.setItem('loginId', found.id);
        this.loginId.set(found.id);
        this.userservice.Login(found.id);
        sessionStorage.setItem('Role', found.role);
        this.loginRole.set(found.role);
      }
    }
  }
  // check login by email
  LoginByEmail(email: HTMLInputElement, alert: HTMLElement){
    alert.style.bottom = '120px';
    if(email.value === ''){
      email.style.outline = '1px solid red';
      alert.style.display = 'none';
      alert.textContent = 'Please, fill the email';
      setTimeout(() => alert.style.display = 'flex', 50);
    } else{
      const findEmail = this.users.find((user) => user.email===email.value) || null;
      if(findEmail == null){
        email.style.outline = '1px solid red';
        alert.style.display = 'none';
        alert.textContent = 'Email is wrong, please input again';
        setTimeout(() => alert.style.display = 'flex', 50);
      } else{
        Swal.fire({
          title: "Welcome " + findEmail.name,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        sessionStorage.setItem('loginId', findEmail.id);
        this.loginId.set(findEmail.id);
        this.userservice.Login(findEmail.id);
        sessionStorage.setItem('Role', findEmail.role);
        this.loginRole.set(findEmail.role);
        email.style.outline = 'none';
        alert.style.display = 'none';
      }
    }
  }
  // register
  Register(parent: HTMLElement){
    for(let i = 0; i < 4; i++){
      const input = parent.children[i + 1] as HTMLInputElement;
      input.style.outline = 'none';
    }
    let isEmipty = false;
    for(let i = 0; i < 4; i++){
      const input = parent.children[i + 1] as HTMLInputElement;
      if(input.value==''){
        input.style.outline = '1px solid red';
        isEmipty = true;
      }
    }
    if(isEmipty){
      const alert = parent.children[5] as HTMLElement;
      alert.style.bottom = '120px';
      alert.style.display = 'none';
      setTimeout(() => alert.style.display = 'flex', 50);
      alert.textContent = 'Please, fill all information above';
    } else{
      let newUser = {
        name: (parent.children[1] as HTMLInputElement).value,
        imageUrl: (parent.children[4] as HTMLInputElement).value,
        password: (parent.children[2] as HTMLInputElement).value,
        role: 'User',
        email: (parent.children[3] as HTMLInputElement).value,
        description: ''
      }
      for(let i = 0; i < 4; i++){
        const input = parent.children[i + 1] as HTMLInputElement;
        input.style.outline = 'none';
        input.value = '';
      }
      this.userservice.AddUser(newUser).subscribe((res: any) => {
        Swal.fire({
          title: "Welcome " + (parent.children[1] as HTMLInputElement).value,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        sessionStorage.setItem('loginId', res);
        this.loginId.set(res);
        this.userservice.Login(res);
        sessionStorage.setItem('Role', 'User');
        this.loginRole.set('User');
      });
    }
  }

  // logout
  logout() {
    sessionStorage.removeItem('loginId');
    this.loginId.set('');
    this.userservice.Login('');
    sessionStorage.removeItem('Role');
    this.loginRole.set('');
  }


  // toggle form
  toggleForm(login: HTMLElement, register: HTMLElement, loginEmail: HTMLElement, con: number){
    const parent = login.parentElement as HTMLElement;

    switch(con) {
      case 1 : {
        login.style.display = 'flex';
        register.style.display = 'none';
        parent.style.height = '330px';
        this.inputName.nativeElement.style.outline = 'none';
        this.inputPass.nativeElement.style.outline = 'none';
        this.alertWrong.nativeElement.style.display = 'none';
        break;
      }
      case 2 : {
        register.style.display = 'flex';
        login.style.display = 'none';
        parent.style.height = '400px';
        this.inputName.nativeElement.style.outline = 'none';
        this.inputPass.nativeElement.style.outline = 'none';
        this.alertWrong.nativeElement.style.display = 'none';
        break;
      }
      case 3 : {
        login.style.display = 'flex';
        const timer = setInterval(() => {
          if (parent.clientHeight > 330){
            parent.style.height = `${parent.clientHeight - 10}px`;
          } else if(parent. clientHeight < 330){
            parent.style.height = `${parent.clientHeight + 10}px`;

          } else{
            clearInterval(timer);}
          }, 10);
          register.style.display = 'none';
          loginEmail.style.display = 'none';
        break;
      }
      case 4 : {
        register.style.display = 'flex';
        const timer = setInterval(() => {
        parent.style.height = `${parent.clientHeight + 10}px`;
        if(parent.clientHeight > register.clientHeight){
          clearInterval(timer);}
        }, 10);
        login.style.display = 'none';
        loginEmail.style.display = 'none';
        break;
      } case 5: {
        loginEmail.style.display = 'flex';
        const timer = setInterval(() => {
          parent.style.height = `${parent.clientHeight - 10}px`;
          if(parent.clientHeight < loginEmail.clientHeight){
            clearInterval(timer);}
        }, 10);
        login.style.display = 'none';
        break;
      }
    }
  }
}
