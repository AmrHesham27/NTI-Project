import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth:AuthUserService, private router:Router) { }
  register:FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    userType: new FormControl('', [Validators.required])
  })
  x:Boolean = false 
  errorsObject:any = {
    name:false,
    email:false,
    password:false,
    userType:false,
    phoneNumber:false
  }
  successMssg : string = ""
  failMssg : string = ""
  onBlur(value:string) : void { 
    this.errorsObject[value] = true
    this.failMssg=''
    this.successMssg=''
  } 
  handleRegister(){
    let registerData = this.register.value
    if(this.register.valid){
      this.failMssg = ''
      this.successMssg = ''
      console.log(registerData)
      this._auth.register(registerData).subscribe(
        (res:any) => { console.log(res.data) },
        (e)=>{ 
          this.failMssg = 'Registration failed'
          console.log(e) 
        },
        ()=>{
          this.errorsObject={
            name:false,
            email:false,
            password:false,
            userType:false,
            phoneNumber:false
          }
          this.loginNewUser(registerData)
        }        
      )
    }
  }
  loginNewUser(loginData:any){
    console.log(loginData)
    this._auth.login(loginData).subscribe(
      (res) => { localStorage.setItem("proToken", res.data.token) },
      (e)=>{ console.log(e) },
      ()=>{
        this._auth.isUserLoggedIn=true
        this.router.navigateByUrl("/activate")
      }        
    )
  }
  get name(){ return this.register.get('name')}
  get password(){ return this.register.get('password')}
  get email(){ return this.register.get('email')}
  get phoneNumber(){ return this.register.get('phoneNumber')}
  get userType(){ return this.register.get('userType')}
  ngOnInit(): void {
  }

}
