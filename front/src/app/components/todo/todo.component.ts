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

}
