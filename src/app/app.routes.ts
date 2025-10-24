import { Routes } from '@angular/router';
import { Dashboard } from './Dashboard/dashboard/dashboard';
import { Books } from './Dashboard/books/books';
import { Authors } from './Dashboard/authors/authors';
import { Users } from './Dashboard/users/users';
import { Orders } from './Dashboard/orders/orders';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
