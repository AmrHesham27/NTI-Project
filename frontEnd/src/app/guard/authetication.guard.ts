import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import { AuthUserService } from '../services/user/auth-user.service';

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
        this.router.navigateByUrl('/login')
      }
      else {
        this._auth.isUserLoggedIn = true
        this._auth.authenticate()
        return true
      }
  }
}