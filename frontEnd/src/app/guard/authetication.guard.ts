import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
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
      if (!this._auth.isUserLoggedIn) { this._auth.me().subscribe(
        (res:any)=>{
          console.log(res)
          this._auth.isUserLoggedIn = true
          this._auth.userData = res['data']
          if (!res['data']['activated']) { this.router.navigateByUrl('/activate') } 
        },
        (e)=>{ this.router.navigateByUrl('/login') },
        ()=>{}
      )}
      else if (this._auth.isUserLoggedIn && !this._auth.userData['activated']) {
        this.router.navigateByUrl('/activate') 
      }
    return true;
    }
}