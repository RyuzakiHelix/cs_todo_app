import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ListToDo} from '../../mock-ToDo';
import {ToDo} from '../../ToDo';
import {TodoService} from '../../services/todo.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
  listtodo: Observable<ToDo[]> = new Observable<ToDo[]>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.listtodo = this.todoService.getListToDo();
  }

  deleteTodo(todo:ToDo){
    this.todoService.deleteToDo(todo).subscribe(() => {
      this.listtodo = this.todoService.getListToDo();
    });
  }
  addToDo(todo:ToDo){
    this.todoService.addToDo(todo).subscribe(() => {
      this.listtodo = this.todoService.getListToDo();
    });
  }
  
  toggleTodo(todo:ToDo){
    todo.reminder = !todo.reminder;
    this.todoService.toggleToDo(todo).subscribe(() => {
      this.listtodo = this.todoService.getListToDo();
    });
  }

}
