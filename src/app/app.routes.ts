import { Routes } from '@angular/router';
import { Dashboard } from './Dashboard/dashboard/dashboard';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: Dashboard}
];
