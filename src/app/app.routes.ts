import { Routes } from '@angular/router';
import { Dashboard } from './Dashboard/dashboard/dashboard';
import { Books } from './Dashboard/books/books';
import { Authors } from './Dashboard/authors/authors';
import { Users } from './Dashboard/users/users';
import { Orders } from './Dashboard/orders/orders';
import { Home } from './home/home';
import { Bookpage } from './bookpage/bookpage';
import { Authorpage } from './authorpage/authorpage';
import { Categorypage } from './categorypage/categorypage';
import { Detail } from './detail/detail';
import { Wishlist } from './wishlist/wishlist';
import { Cart } from './cart/cart';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: Home},
    {path: 'book', component: Bookpage},
    {path: 'author', component: Authorpage},
    {path: 'category', component: Categorypage},
    {path: 'detail/:id', component: Detail},
    {path: 'wishlist', component: Wishlist},
    {path: 'cart', component: Cart},
    {path: 'dashboard', component: Dashboard,
        children: [
            {path: '', redirectTo: 'books', pathMatch: 'full'},
            {path: 'books', component: Books},
            {path: 'authors', component: Authors},
            {path: 'users', component: Users},
            {path: 'orders', component: Orders}
        ]
    }
];
