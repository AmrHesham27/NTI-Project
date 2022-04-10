import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import { AuthUserService } from '../services/user/auth-user.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AutheticationGuard implements CanActivate {
  constructor(private router:Router, public _auth:AuthUserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
      let token = this._auth.getProToken()

      if (!token) {
        this.router.navigateByUrl('/login');
        return;
      }
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);

      if (isExpired) {
        localStorage.removeItem('proToken')
        this.router.navigateByUrl('/login');
        return
      }

      this._auth.isUserLoggedIn = true
      this._auth.authenticate()
      return true
  }
}
