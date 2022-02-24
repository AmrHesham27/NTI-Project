import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send-new-password',
  templateUrl: './send-new-password.component.html',
  styleUrls: ['./send-new-password.component.css']
})
export class SendNewPasswordComponent implements OnInit {

  constructor(private _auth:AuthUserService, 
              private router:Router, 
              private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
  }
  form:FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required])
  })
  sendNewPassword(form:FormGroup){
    if(form.valid && this.newPassword?.value == this.confirm?.value){
      let userData = {
        otp : this.activatedRoute.snapshot.params['otp'],
        email : this.activatedRoute.snapshot.params['email'],
        newPassword : this.newPassword?.value
      }
      this._auth.sendNewPassword(userData).subscribe(
        (res:any)=>{
          console.log(res)
          alert('password was changed successfully')
          this.router.navigateByUrl('/login')
        },
        (e)=>{
          console.log(e)
          alert('this link is invalid')
        },
        ()=>{
        }
      )
    }
    else {
      alert('password and confirm password do not match')
    }
  }
  get newPassword(){ return this.form.get('newPassword')}
  get confirm(){ return this.form.get('confirm')}
}
