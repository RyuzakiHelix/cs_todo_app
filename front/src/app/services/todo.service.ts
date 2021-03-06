import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, tap} from 'rxjs';
import { ToDo } from '../ToDo';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor(private http:HttpClient) { }

 // readonly apiURL='https://localhost:7221/todoitems';
  readonly apiURL='http://localhost:7221/todoitems'
  readonly apiURL2='http://localhost:5097/todoitems';
  formData: ToDo = new ToDo();

  ListToDo: ToDo[]=[];

  private todos = new BehaviorSubject<ToDo[]>(this.ListToDo);
  private todos$ = this.todos.asObservable();

  getListToDo(): Observable<ToDo[]>{
   // return this.http.get<ToDo[]>(this.apiURL);
    return this.http.get<ToDo[]>(this.apiURL).pipe(
      tap(response =>{
        this.todos.next(response)
      })
    );
      
   //return this.todos$=this.http.get<ToDo[]>(this.apiURL);
   // return this.todos$;
  }

  deleteToDo(todo:ToDo): Observable<ToDo>{
    const apiDURL=`${this.apiURL}/${todo.id}`;
    return this.http.delete<ToDo>(apiDURL);
  }
  addToDo(todo:ToDo): Observable<ToDo>{
    this.todos.next([todo]);
    return this.http.post<ToDo>(this.apiURL, todo, httpOptions);
  }
  toggleToDo(todo:ToDo): Observable<ToDo>{
    const apiDURL=`${this.apiURL}/${todo.id}`;
    return this.http.put(apiDURL, todo, httpOptions);
  }

}
