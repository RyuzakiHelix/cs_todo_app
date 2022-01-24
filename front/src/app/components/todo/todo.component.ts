import { Component, OnInit } from '@angular/core';
import {ListToDo} from '../../mock-ToDo';
import {ToDo} from '../../ToDo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  listtodo: ToDo[]=ListToDo;

  constructor() { }

  ngOnInit(): void {
  }

}
