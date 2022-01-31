import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ListToDo} from '../../mock-ToDo';
import {ToDo} from '../../ToDo';
import {TodoService} from '../../services/todo.service';
import { Subscriber, Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  //listtodo: ToDo[]= [];
  listtodo: Observable<ToDo[]> = new Observable<ToDo[]>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    //this.todoService.getListToDo().subscribe((listtodo) => this.listtodo=listtodo );
    this.listtodo = this.todoService.getListToDo();
  }

  deleteTodo(todo:ToDo){
    console.log("delete");
    console.log(todo);
    this.todoService.deleteToDo(todo).subscribe(() => this.listtodo = this.todoService.getListToDo());

  }
  addToDo(todo:ToDo){
    console.log("add");
    console.log(todo);
    //this.todoService.addToDo(todo).subscribe((todo) => this.listtodo.push(todo));
    this.todoService.addToDo(todo).subscribe(() => this.listtodo = this.todoService.getListToDo());
  }
  
  toggleTodo(todo:ToDo){
    todo.reminder = !todo.reminder;
    console.log("toggle");
    console.log(todo);
    this.todoService.toggleToDo(todo).subscribe();

  }

}
