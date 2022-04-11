import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    if (this._authService.isUserAuthenticated()) {
      return true;
    }
    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}
