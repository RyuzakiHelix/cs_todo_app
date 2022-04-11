import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Response } from '../models/Response';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // private currentUserSubject: BehaviorSubject<User>;
 // public currentUser: Observable<User>;
  //above or under one of them, ABOVE IS FOCUS ON USER WITH TOKEN, CHECK JWT.TS AND USERS MODULE TOKEN
  //above uses constructor+currentuservalue
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

 // private isAuthenticated: boolean =false;
  private isloggedin:boolean=false;
  private subject = new Subject<any>();

  constructor(private http: HttpClient,private _jwtHelper: JwtHelperService) { 
   // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')!));
   // this.currentUser = this.currentUserSubject.asObservable();
  }
  /*
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }*/
  //TESTING 
  public sendAuthStateChangeNotification(){
   // this.isAuthenticated=!this.isAuthenticated;
   // this._authChangeSub.next(this.isAuthenticated);
  }
  //TESTING
  public sendAuthStateChangeNotification2 = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
    console.log("u send auth",isAuthenticated);
  }


  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    console.log("token je",token, "istice: ",this._jwtHelper.isTokenExpired(token!));
    if(token && !this._jwtHelper.isTokenExpired(token)){
      return true;
    }else{
      return false;
    }
    //return token && !this._jwtHelper.isTokenExpired(token!);
  }

  readonly apiURL='https://localhost:7221/accounts/register';
  readonly apiURL2='https://localhost:7221/accounts/login';
  //route use only if not going to use above urls...
  public registerUser = (route: string, user: User) => {
    //return this.http.post<Response> (this.createCompleteRoute(route, this.apiURL), body);
    return this.http.post<User>(this.apiURL, user, httpOptions);
  }
  public loginUser = (route: string, user: User) => {
   // return this.http.post<Response>(this.apiURL2, body, httpOptions);
    return this.http.post<any>(this.apiURL2, user, httpOptions)
    .pipe(map(user => {
     // this.sendAuthStateChangeNotification();
      //this.sendAuthStateChangeNotification2(user.isSuccessful!);
     // this.sendAuthStateChangeNotification2(user.isAuthSuccessful);
     this.sendAuthStateChangeNotification2(true);
      localStorage.setItem("token", user.token);
      this.isloggedin=true;
      this.subject.next(this.isloggedin);
      //localStorage.setItem('token', JSON.stringify(user));
     // this.currentUserSubject.next(user);
      return user;
  }));
   // return this.http.post<Response>(this.createCompleteRoute(route, this.apiURL2), body);
   /* return this.http.post<User>(this.apiURL2, body, httpOptions)
    .subscribe(res =>{
      localStorage.setItem("token", res.token);
    });
    */
  }

  public logout = () => {
    localStorage.removeItem("token");
   // this.sendAuthStateChangeNotification();
   this.sendAuthStateChangeNotification2(false);
    this.isloggedin=false;
    this.subject.next(this.isloggedin);
    //this.currentUserSubject.next(null);
   // this.sendAuthStateChangeNotification(false);
  }
  //SAME LOGIC AS UI SERVICE, no longer needed... changed to sendauthstate...
  onlogin():Observable<any>{
    return this.subject.asObservable();
  }

}
