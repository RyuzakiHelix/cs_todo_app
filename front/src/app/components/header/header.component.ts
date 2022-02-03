import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'ToDo tasks';
  showAddToDo: boolean = false;
  subscription: Subscription = new Subscription;
  
  constructor(private uiService:UiService) { 
    this.subscription = this.uiService.onToggle().subscribe(Value => this.showAddToDo = Value);
  }

  ngOnInit(): void {}

  AddTask(){
    this.uiService.toggleShowAdd();
    console.log('toggle Add');
  }

}
