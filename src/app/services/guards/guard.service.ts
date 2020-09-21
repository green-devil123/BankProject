import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if(this.loginService.loggedIn()) {
      return true;
    } else  {
        this.router.navigate(['/']);
    }
  }
}
