import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    const tokens = localStorage.getItem('accessToken')
    if (isLoggedIn && tokens) {
      // this.router.navigate(['/dashboard']);
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
