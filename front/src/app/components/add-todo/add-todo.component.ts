import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDo } from 'src/app/ToDo';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

import { BehaviorSubject, filter, map, mergeMap, Observable } from 'rxjs';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  @Output() onAddToDo:EventEmitter<ToDo> = new EventEmitter();
  name?:string;
  day?:string;
  reminder?:boolean;

  showAddToDo: boolean = false;
  subscription: Subscription = new Subscription;

  constructor(private uiService:UiService, private todoService: TodoService) { 
    this.subscription = this.uiService.onToggle().subscribe(Value => this.showAddToDo = Value);
  }

  ngOnInit(): void {}

  onSubmit(){
    if(!this.name || !this.day){
      alert("Fill up the form");
    }else{
    const newToDo = {
      name:this.name,
      day:this.day,
      reminder:this.reminder 
    }
    //this.onAddToDo.emit(newToDo);
    this.addToDo(newToDo);

    this.name="";
    this.day="";
    this.reminder=false;
    }
  }

  addToDo(todo:ToDo){
    this.todoService.addToDo(todo).pipe(
      mergeMap(addToDoResult => this.todoService.getListToDo()))
      .subscribe()
  }

}
