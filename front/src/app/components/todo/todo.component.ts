import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {ListToDo} from '../../mock-ToDo';
import {ToDo} from '../../ToDo';
import {TodoService} from '../../services/todo.service';
import { Observable, Subscriber } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  listtodo: Observable<ToDo[]> = new Observable<ToDo[]>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.listtodo = this.todoService.getListToDo();
  }
}
