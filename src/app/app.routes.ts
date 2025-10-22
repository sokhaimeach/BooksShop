import { Routes } from '@angular/router';
import { Dashboard } from './Dashboard/dashboard/dashboard';
import { Books } from './Dashboard/books/books';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: Dashboard,
        children: [
            {path: '', redirectTo: 'books', pathMatch: 'full'},
            {path: 'books', component: Books}
        ]
    }
];
