import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthUserService } from '../services/user/auth-user.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
// for pages where authenticated users and guests both can visit
export class AllUsers implements CanActivate {
  constructor(private router:Router, public _auth:AuthUserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    let token = this._auth.getProToken()
    if (token) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if(!isExpired){
        this._auth.isUserLoggedIn = true
        this._auth.authenticate()
      }
      else
      localStorage.removeItem('proToken')
    }
    return true
  }
}
