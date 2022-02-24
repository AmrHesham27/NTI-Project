import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private _auth:AuthUserService, private router: Router) { }
  ngOnInit(): void {
  }
  form:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required])
  })
  errorsObject:any = {
    email: false,
    password: false,
  }
  get email(){ return this.form.get('email')}
  onBlur(value:string) : void { this.errorsObject[value] = true } 
  forgotPassword(form:FormGroup){
    if(form.valid){
      this._auth.forgotPassword(this.form.value).subscribe(
        (res) => {
          alert('retrive link was sent to your email')
          console.log(res)
        },
        (e)=>{ 
          alert('please enter your email')
          console.log(e)
          console.log(this.form.value)
        },
        ()=>{
        }        
      )
    }
  }
}
