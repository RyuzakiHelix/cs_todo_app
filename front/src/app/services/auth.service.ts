import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Response } from '../models/Response';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

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

  private isloggedin:boolean=false;
  private subject = new Subject<any>();

  constructor(private http: HttpClient,private _jwtHelper: JwtHelperService,private _externalAuthService: SocialAuthService) { 
     
   // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')!));
   // this.currentUser = this.currentUserSubject.asObservable();
  }
  /*
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }*/

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

  readonly apiURLregister='http://localhost:7221/accounts/register';
  readonly apiURLlogin='http://localhost:7221/accounts/login';
  readonly apiURLexterlan='http://localhost:7221/accounts/externallogin';

  public registerUser = (user: User) => {
    return this.http.post<User>(this.apiURLregister, user, httpOptions);
  }
  public loginUser = (user: User) => {
    return this.http.post<any>(this.apiURLlogin, user, httpOptions)
    .pipe(map(user => {

      this.sendAuthStateChangeNotification2(true);
      localStorage.setItem("token", user.token);
      this.isloggedin=true;
      this.subject.next(this.isloggedin);

      return user;
  }));
  
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification2(false);
    this.isloggedin=false;
    this.subject.next(this.isloggedin);

  }

  public signInWithGoogle = ()=> {
    console.log("sign in with google");
    console.log(this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID));

    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public signOutExternal = () => {
    this._externalAuthService.signOut();
  }
  public externalLogin = (user: Response) => {
    return this.http.post<any>(this.apiURLexterlan, user, httpOptions);
  }

}
