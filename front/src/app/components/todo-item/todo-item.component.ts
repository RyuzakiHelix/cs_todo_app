import { Component, OnInit, Input } from '@angular/core';
import { ToDo } from 'src/app/ToDo';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: ToDo;
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

}
