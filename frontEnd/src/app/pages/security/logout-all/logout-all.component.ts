import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/user/auth-user.service';

@Component({
  selector: 'app-logout-all',
  templateUrl: './logout-all.component.html',
  styleUrls: ['./logout-all.component.css']
})
export class LogoutAllComponent implements OnInit {

  constructor(private _auth:AuthUserService, private router:Router) { }

  ngOnInit(): void {
  }
  logoutAll(){
    this._auth.logoutAll().subscribe(
      (res:any)=>{
        localStorage.removeItem('proToken')
        this._auth.isUserLoggedIn = false
        this._auth.userData = {
          userType:'',
          name:'',
          password:'',
          email:'',
          newEmail:'', 
          phoneNumber:'', 
          favourites:[],
          notifications:[],
          tokens:[],
          otp:'',
          activated:false, 
          addresses:[ 
              {
                  addrType:'',
                  addrContent:'',
                  isDefault:false
              }
          ],
          avatar:''
        }
        this.router.navigateByUrl('/login')
      },
      (e)=>{
        console.log(e)
      },
      ()=>{}
    )
  }

}
