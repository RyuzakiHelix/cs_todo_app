import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { ToDo } from 'src/app/ToDo';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  Todo$!: Observable<ToDo>;

  constructor(private route: ActivatedRoute,private router: Router,private todoService: TodoService) { }

  ngOnInit(): void {
    this.Todo$=this.route.paramMap.pipe(
      switchMap(params=>this.todoService.getToDo(params.get('id')!)))
  }

}
