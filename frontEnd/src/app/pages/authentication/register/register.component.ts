import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private _auth:AuthUserService, 
              private router:Router, 
              private toastr: ToastrService) { }
  register:FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
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
  onBlur(value:string) : void { 
    this.errorsObject[value] = true
  } 
  handleRegister(){
    let registerData = this.register.value
    if(this.register.valid){
      console.log(registerData)
      this._auth.register(registerData).subscribe(
        (res:any) => { 
          console.log(res.data) 
          this.toastr.success('You were registered successfully', 'Success', { timeOut: 9000 });
        },
        (e)=>{ 
          this.toastr.error('Registration failed', 'Error', { timeOut: 9000 });
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
    console.log('register page')
  }
}