import { Component, OnInit } from '@angular/core';
import {ListToDo} from '../../mock-ToDo';
import {ToDo} from '../../ToDo';
import {TodoService} from '../../services/todo.service';
import { Subscriber } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  listtodo: ToDo[]= [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getListToDo().subscribe((listtodo) => this.listtodo=listtodo );
  }

  deleteTodo(todo:ToDo){
    console.log("delete");
    console.log(todo);
    this.todoService.deleteToDo(todo).subscribe(() => this.listtodo= this.listtodo.filter(t => t.id !== todo.id));

  }
  addToDo(todo:ToDo){
    console.log("add");
    console.log(todo);
    this.todoService.addToDo(todo).subscribe((todo) => this.listtodo.push(todo));
  }
  
  toggleTodo(todo:ToDo){
    todo.reminder = !todo.reminder;
    console.log("toggle");
    console.log(todo);
    this.todoService.toggleToDo(todo).subscribe();

  }

}
