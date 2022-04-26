import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, tap, map} from 'rxjs';
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

  //readonly apiURL='https://localhost:7221/todoitems';
  readonly apiURL='http://localhost:7221/todoitems';
  readonly apiURL2='http://localhost:5097/todoitems';
  formData: ToDo = new ToDo();
  ListToDo: ToDo[]= [];

  public todos = new BehaviorSubject<ToDo[]>(this.ListToDo);
  public todos$ = this.todos.asObservable();

  getListToDo(): Observable<ToDo[]>{
    return this.http.get<ToDo[]>(this.apiURL).pipe(
      tap(response =>{
        this.todos.next(response);
      })
    );
  }

  getToDo(id: number | string){
    return this.getListToDo().pipe(
      map(todolist => todolist.find(todo => todo.id === +id)!)
    );
  }

  deleteToDo(todo:ToDo): Observable<ToDo>{
    const apiDURL=`${this.apiURL}/${todo.id}`;
    return this.http.delete<ToDo>(apiDURL);
  }
  addToDo(todo:ToDo): Observable<ToDo>{
    //should test pipe during return to pipe next todo...
    this.todos.next([todo]);
    return this.http.post<ToDo>(this.apiURL, todo, httpOptions);
  }
  toggleToDo(todo:ToDo): Observable<ToDo>{
    const apiDURL=`${this.apiURL}/${todo.id}`;
    return this.http.put(apiDURL, todo, httpOptions);
  }

}
