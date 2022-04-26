import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  loginForm!: FormGroup;
  errorMessage = '';
  public showError?: boolean;
  submitted = false;
  constructor(private _authService: AuthService, private _errorHandling: ErrorHandlingService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
    this.registerForm.get('confirm')!.setValidators([Validators.required,
    this._errorHandling.validateConfirmPassword(this.registerForm.get('password')!)]);

  }

  
  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  get form() { return this.registerForm.controls; }
  
  public registerUser = (registerFormValue:any) => {
    this.submitted = true;
    this.showError = false;
    const formValues = { ...registerFormValue };
    const user: User = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };

    if (this.registerForm.invalid) {
      return;
    }
    this._authService.registerUser(user)
    .subscribe(_ => {
      console.log("Successful registration");
      this.errorMessage = "Successful registration";
      this.showError = true;
    },
    error => {
      this.errorMessage = error;
      this.showError = true;
    })
}

}
