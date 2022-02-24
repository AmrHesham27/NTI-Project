import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthUserService } from '../services/user/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoggedInUserGuard implements CanActivate {
  constructor(private router:Router, public _auth:AuthUserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
      let token = this._auth.getProToken()
      if (token) { 
        this._auth.isUserLoggedIn = true
        this._auth.authenticate()
        this.router.navigateByUrl('/myProfile')
      }
      else {
        return true
      }
  }
}
