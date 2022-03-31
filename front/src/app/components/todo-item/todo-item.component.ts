import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from 'src/app/ToDo';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo?: ToDo;
  @Output() onDeleteTodo: EventEmitter<ToDo> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<ToDo> = new EventEmitter();
  faTimes = faTimes;
  progress = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onClickDelete(todo?:ToDo) {
    console.log(todo);
    console.log("ovo radi onClickDelete");
    this.onDeleteTodo.emit(todo);
  }
  onToggle(todo?:ToDo) {
    console.log(todo);
    console.log("ovo radi onClickToggle");
    this.onToggleReminder.emit(todo);
  }

  onHoldDelete(event:number, todo?:ToDo) {
    this.progress = event / 10;
    if (this.progress > 100) {
      this.onDeleteTodo.emit(todo);
    }
  }

}
