import { Component, OnInit } from '@angular/core';
import {ToDo} from '../../ToDo';
import {TodoService} from '../../services/todo.service';
import { filter, mergeMap, Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  listtodo: Observable<ToDo[]> = new Observable<ToDo[]>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.listtodo = this.todoService.todos$;
  }

  deleteTodo(todo:ToDo){
    // na ovaj način ULANČAVAM pozive sa mergeMap
    this.todoService.deleteToDo(todo).pipe(
      // handlanje deletetodo rezultata, npr ako je succes ide pipe dalje
      filter(deleteToDoResult => true),
      // poziv druge metode, te vraćanje iz pipe-a getdlisttodo observable
      mergeMap(
        (deleteToDoResult: ToDo) => { return this.todoService.getListToDo() })
    )
      // kranji subscribe dobiva na kraju ZADNJI rezultat iz pipe-a
      .subscribe(
        (getListToDo: ToDo[]) => {
          // bilo koji posao kojki treba obaviti, konkretno tu nama ne treba ništa
        }
    );
  }

  addToDo(todo:ToDo){
    this.todoService.addToDo(todo).pipe(
      mergeMap(addToDoResult => this.todoService.getListToDo()))
      .subscribe()
  }

  toggleTodo(todo:ToDo){
    todo.reminder = !todo.reminder;
    this.todoService.toggleToDo(todo).pipe(
      mergeMap(toggleToDoResult => this.todoService.getListToDo()))
      .subscribe()
  }
}
