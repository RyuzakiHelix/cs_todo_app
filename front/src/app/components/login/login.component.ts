import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public errorMessage: string = '';
  public showError!: boolean;
  private _returnUrl?: string;
  
  constructor(private _authService: AuthService,private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
/*
  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }
*/
  public login = (loginFormValue:any) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: User = {
      username: login.username,
      email: login.email,
      password: login.password
    }/*
    this._authService.loginUser('api/accounts/login', userForAuth)
            .pipe(first())
            .subscribe({
                next: () => {
                    this._router.navigate([this._returnUrl]);
                },
                error: error => {
                  this.errorMessage = error;
                  this.showError = true;
                }
            });
            */
    
    this._authService.loginUser('api/accounts/login', userForAuth)
    .subscribe(res => {
       //localStorage.setItem("token", res.token!);
       this._authService.sendAuthStateChangeNotification2(true);
       //this._authService.sendAuthStateChangeNotification();
      // this._authService.sendAuthStateChangeNotification2(res.isSuccessful!);
       console.log(res.isSuccessful);
       console.log(res);
       this._router.navigate([this._returnUrl]);

    },
    (error:any) => {
      //todo error handling service
      this.errorMessage = error;
      this.showError = true;
    })
    

  }
  

}
