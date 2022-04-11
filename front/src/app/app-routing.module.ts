import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoComponent } from './components/todo/todo.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'todo-list', component: TodoComponent,canActivate: [AuthGuard] },
  { path: 'todo-details/:id', component: TodoDetailsComponent, data: {todo:'todo'}, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
