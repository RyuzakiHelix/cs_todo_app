import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, observable, of} from 'rxjs';
import { ListToDo } from '../mock-ToDo';
import { ToDo } from '../ToDo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  readonly apiURL='https://localhost:7221/todoitems';
  formData: ToDo = new ToDo();

  getListToDo(): Observable<ToDo[]>{
   // return this.http.get<ToDo[]>(this.apiURL);
    
    const Listtodo= of(ListToDo);
    return Listtodo;
    
  }
}
