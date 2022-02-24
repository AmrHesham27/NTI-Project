import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  constructor(private _auth: AuthUserService) { }

  ngOnInit(): void {
  }
  // messages
  successMssg:string = ''
  failMssg:string = ''
  // form
  changeEmailForm:FormGroup = new FormGroup({
    newEmail: new FormControl('', [Validators.required, Validators.email]),
    OTP: new FormControl('', [Validators.required])
  })
  get newEmail(){ return this.changeEmailForm.get('newEmail')}
  get OTP(){ return this.changeEmailForm.get('password')}
  changeEmail(){ // step 1
    let newEmail = this.changeEmailForm.value.newEmail
    this._auth.changeEmail({newEmail}).subscribe(
      (res:any)=>{
        this.failMssg = ''
        this.successMssg = 'OTP was sent to your new Email'
        console.log(res)
      },
      (e)=>{
        console.log(e)
        this.successMssg = ''
        this.failMssg = 'please enter valid email'
      },
      ()=>{}
    )
  }
  confirmChangeEmail(){ // step 2
    let OTP = this.changeEmailForm.value.OTP
    this._auth.confirmChangeEmail({otp:OTP}).subscribe(
      (res:any)=>{
        this.failMssg = ''
        this.successMssg = 'Your Email was chnaged successfully'
        this.changeEmailForm.reset()
      },
      (e)=>{
        console.log(e)
        this.successMssg = ''
        this.failMssg = 'OTP was wrong , please try again'
      },
      ()=>{}
    )
  }
}
