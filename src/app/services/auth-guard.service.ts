import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token') && localStorage.getItem('date-login')) {
      if ((Math.abs(new Date().getTime() - this.authService.getdateLogin().getTime() ) / 36e5) > 1) {
        localStorage.removeItem('token');
        localStorage.removeItem('date-login');
        return this.router.navigate(['login']);
      }
      return true;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('date-login');
      return this.router.navigate(['login']);
    }
  }
}
