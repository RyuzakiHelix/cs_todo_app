import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, tap, filter, count, of, Subject, map, lastValueFrom} from 'rxjs';
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

  ListToDo: ToDo[]=[];

  private todos = new BehaviorSubject<ToDo[]>(this.ListToDo);
  private todos$ = this.todos.asObservable();

  getListToDo(): Observable<ToDo[]>{
    return this.http.get<ToDo[]>(this.apiURL).pipe(
      tap(response =>{
        this.todos.next(response)
      })
    ); 
  }
  
  ReminderCounter():number{
    var count=0;
    this.todos.subscribe(result => {console.log('total el ',result.length)});
    this.todos.subscribe(result => {
      result.forEach(todo=>{
        count += todo.reminder ? 1:0;
      })
      console.log('el set reminder ',count);
    });
    
    return count;
  }
/*
  ReminderCounter(){
    var count=0;
    this.ListToDo.forEach(element => {
      count += element.reminder ? 0:1;
      console.log(element);
    });
    console.log(count);
    return count;
  }
  */
   
  countListToDoReminders(): number{
    var sum=0;
    this.todos$.subscribe(res =>{
     // console.log(res.filter(t=>t.reminder===true));
     // console.log('ukupno ',res.length);
      sum=res.length;
    });

    var all = this.todos.pipe(count());
    all.subscribe(val=>console.log('ukupno '+ val));
    this.todos.subscribe(res=>{res.filter(t=>t.reminder===true)});

    let all_nums = of(this.todos$);
    let final_val = all_nums.pipe(count());
    final_val.subscribe(x => console.log("The count is "+x));
    
    
    
   // console.log(this.ListToDo.filter(t=>t.reminder===true).length);
   // let total = 0;
   // console.log(this.todos.forEach(value => {
     // total += 1;
    //  console.log('sveukupnoih ima: ', total, value);
   // }))
    return sum;
   // return this.ListToDo.filter(t=>t.reminder===true).length;

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
