import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'ToDo tasks';
  showAddToDo: boolean = false;
  public isloggedin?: boolean ;
  subscription: Subscription = new Subscription;
  public isUserAuthenticated?: boolean;
  
  constructor(private uiService:UiService, private _authService: AuthService, private _router: Router) { 
    this.subscription = this.uiService.onToggle().subscribe(Value => this.showAddToDo = Value);
    this.subscription = this._authService.onlogin().subscribe(Value => this.isloggedin = Value);
   // this.subscription = this._authService.authChanged.subscribe(Value => this.isUserAuthenticated = Value);
    this._authService.authChanged.subscribe(Value => {this.isUserAuthenticated = Value;})

  }

  ngOnInit(): void {
   // this.subscription = this._authService.authChanged.subscribe(Value => this.isUserAuthenticated = Value);
    this._authService.authChanged.subscribe(Value => {this.isUserAuthenticated = Value;})
  }

  public logout(){
    this._authService.logout();
    this._router.navigate(["/"]);
  }

  AddTask(){
    this.uiService.toggleShowAdd();
    console.log('toggle Add');
  }

}
