import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewBooksComponent } from './components/view-books/view-books.component';
import { AddBooksComponent } from './components/add-books/add-books.component';
const routes: Routes = [
  {
    path: 'addBook',
    component: AddBooksComponent
  },
  {
    path: 'viewBook',
    component: ViewBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
