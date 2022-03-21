import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {ToDo} from '../../ToDo';
import { filter, map, Observable } from 'rxjs';
import {TodoService} from '../../services/todo.service';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit  {

  numberOfTodos: Observable<number> = new Observable<number>();
  numberOfReminders: Observable<number> = new Observable<number>();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {

    this.numberOfTodos = this.todoService.todos$.pipe(
      map(todoList => todoList.length)
    )

    this.numberOfReminders = this.todoService.todos$.pipe(
      map(todoList => todoList.filter(todo => todo.reminder == true)),
      map(todoList => todoList.length)
    )
  }

}
