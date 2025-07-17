import { Routes } from '@angular/router';
import { CategoryMenuComponent } from './category-menu/category-menu.component';

export const routes: Routes = [
    { path: 'category/:id', component: CategoryMenuComponent }
];
