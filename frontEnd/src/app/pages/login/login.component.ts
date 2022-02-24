import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _auth:AuthUserService, private router: Router) { }
  ngOnInit(): void {
  }
  login:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  errorsObject:any = {
    email: false,
    password: false,
  }
  failMssg : string = ""
  get password(){ return this.login.get('password')}
  get email(){ return this.login.get('email')}
  onBlur(value:string) : void { this.errorsObject[value] = true } 
  handleLogin(loginForm:FormGroup){
    if(loginForm.valid){
      this._auth.login(this.login.value).subscribe(
        (res) => {
          this._auth.isUserLoggedIn = true
          this._auth.userData = res.data.user
          localStorage.setItem("proToken", res.data.token) 
        },
        (e)=>{ 
          this.failMssg = "Invalid email or password" 
        },
        ()=>{
          this.errorsObject['email'] = false
          this.errorsObject['password'] = false
          loginForm.reset()
          this._auth.isUserLoggedIn=true
          this.profile()
        }        
      )
    }
  }
  profile(){ 
    this._auth.me().subscribe(
      (data:any)=>{},
      (e)=>{
        console.log(e)
      },
      ()=>{ 
        this.router.navigateByUrl('/myProfile')
      }
    )
  }
}