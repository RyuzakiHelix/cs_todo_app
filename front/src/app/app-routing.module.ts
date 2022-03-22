import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path: 'todo-list', component: TodoComponent },
  { path: 'todo-details/:id', component: TodoDetailsComponent, data: {todo:'todo'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
