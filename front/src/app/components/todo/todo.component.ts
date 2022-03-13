import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ListToDo} from '../../mock-ToDo';
import {ToDo} from '../../ToDo';
import {TodoService} from '../../services/todo.service';
import { Subscriber, Observable, Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  //listtodo: ToDo[]= [];
  listtodo: Observable<ToDo[]> = new Observable<ToDo[]>();
 // all :Observable<number> = new Observable<number>();
  all : number=0;
  total : number=0;
  sub : Subscription = new Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    //this.todoService.getListToDo().subscribe((listtodo) => this.listtodo=listtodo );
    this.listtodo = this.todoService.getListToDo();
    this.count();
   // this.all = this.todoService.ReminderCounter();
  }

  count(){
    this.sub = this.todoService.getListToDo().subscribe(res=>{
      this.all= this.todoService.ReminderCounter();
      this.total = res.length;
    });
  }
  
  deleteTodo(todo:ToDo){
    console.log("delete");
    console.log(todo);
    this.todoService.deleteToDo(todo).subscribe(() => {
      this.listtodo = this.todoService.getListToDo();

      this.sub = this.todoService.getListToDo().subscribe(res=>{
        this.all= this.todoService.ReminderCounter();
        this.total = res.length;
      });

    });
   // this.count();

  }
  addToDo(todo:ToDo){
    console.log("add");
    console.log(todo);
    //this.todoService.addToDo(todo).subscribe((todo) => this.listtodo.push(todo));
    this.todoService.addToDo(todo).subscribe(() => {
      this.listtodo = this.todoService.getListToDo();

      this.sub = this.todoService.getListToDo().subscribe(res=>{
        this.all= this.todoService.ReminderCounter();
        this.total = res.length;
      });
    });
    //this.count();
  }
  
  toggleTodo(todo:ToDo){
    todo.reminder = !todo.reminder;
    console.log("toggle");
    console.log(todo);
    this.todoService.toggleToDo(todo).subscribe();
    this.all=this.todoService.ReminderCounter();

  }

}
