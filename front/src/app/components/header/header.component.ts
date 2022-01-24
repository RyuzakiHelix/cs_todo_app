import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'ToDo tasks';
  constructor() { }

  ngOnInit(): void {}

  AddTask(){
    console.log('Add');
  }

}
