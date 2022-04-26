import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        return throwError(() => errorMessage);
      })
    )
  }

  private handleError = (error: HttpErrorResponse) => {

    if(error.status === 404){
      return this.handleNotFound(error);
    }
    else if(error.status === 400){
      return this.handleBadRequest(error);
    }
     // Generic HTTP errors
     
     switch (error.status) {

      case 403:
        return this.handleErrors('error You dont have the required permissions');

      case 422:
        return this.handleErrors('error Invalid data provided');

      case 500:
      case 501:
      case 502:
      case 503:
        return this.handleErrors('error An internal server error occurred');

      case -1:
        return this.handleErrors(
          'error You appear to be offline. Please check your internet connection and try again.'
        );

      case 0:
        return this.handleErrors('error CORS issue?');

      default:
        return this.handleErrors('error An unknown error occurred');
    }
    
  }
  private handleNotFound = (error: HttpErrorResponse) => {
    this._router.navigate(['/404']);
    return error.message;
  }
  private handleBadRequest = (error: HttpErrorResponse) => {
    if(this._router.url === '/register'){
      let message = '';
      const values = Object.values(error.error.errors);
      values.map((m) => {
         message += m + '<br>';
      })
      return message.slice(0, -4);
    }
    else{
      return error.error ? error.error : error.message;
    }
  }

  private handleErrors = (error: string) => {
    if(this._router.url === '/register'){
      let message = '';
      const values = Object.values(error);
      values.map((m) => {
         message += m ;
      })
      return message;
    }
    else{
      return error ? error : error;
    }
  }

  public validateConfirmPassword = (passwordControl: AbstractControl): ValidatorFn => {
    return (confirmationControl: AbstractControl) : { [key: string]: boolean } | null => {
      const confirmValue = confirmationControl.value;
      const passwordValue = passwordControl.value;
      if (confirmValue === '') {
          return { mustMatch: true }
      }
      if (confirmValue !== passwordValue) {
          return  { mustMatch: true }
      } 
      return null;
    };
  }
}
