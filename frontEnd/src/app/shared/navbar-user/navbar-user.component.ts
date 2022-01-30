import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/user/auth-user.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  constructor(public _auth:AuthUserService, private router:Router) {  }

  ngOnInit(): void {
  }
  handleLogout(){
    this._auth.logout().subscribe(
      (res:any)=>{
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
        console.log(res.message)
        this._auth.isUserLoggedIn = false
        this.router.navigateByUrl('/login')
        localStorage.removeItem('proToken')
      },
      (e)=>{ console.log(e) },
      ()=>{}
    )
  }
}
