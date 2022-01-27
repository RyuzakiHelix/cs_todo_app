import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable, of } from 'rxjs';
import { ListToDo } from '../mock-ToDo';
import { ToDo } from '../ToDo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  readonly apiURL='https://localhost:7221/todoitems';
  formData: ToDo = new ToDo();

  private todos = new BehaviorSubject<ToDo[]>(ListToDo);
  private todos$ = this.todos.asObservable();

  getListToDo(): Observable<ToDo[]>{
   // return this.http.get<ToDo[]>(this.apiURL);

    // const Listtodo= of(ListToDo);
    // return Listtodo;

    return this.todos$;
  }

  metoda() {
    this.todos.next([{
      id: 100,
      name: 'ToDo taks number 1',
      day: 'Feb 4th at 14:30',
      reminder: true,
    }])
  }
}
