import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import {ToDo} from '../../ToDo';
import { map, Observable, Subscription } from 'rxjs';
import {TodoService} from '../../services/todo.service';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnChanges  {
  all : number=0;
  countreminder: number = 0;
  total : Observable<number> = new Observable<number>();
  subscription: Subscription = new Subscription;
  @Input() listtodo = new Observable<ToDo[]>();

  constructor(private todoService: TodoService) { 
   this.listtodo=todoService.getListToDo(); 
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.countreminder = 0;
    this.total=this.listtodo.pipe(
      map(lista=>{
        lista.forEach(todo=>{
          this.countreminder += todo.reminder ? 1:0;
        });
        return lista.length;
      })
    )

    this.total.subscribe(val => {
      this.all=val;
    });
  }

}
