import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  constructor(private _auth: AuthUserService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
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
        this.toastr.success('OTP was sent to your new Email', 'Success', { timeOut: 9000 });
        console.log(res)
      },
      (e)=>{
        console.log(e)
        this.toastr.error('please enter valid email', 'Error', { timeOut: 9000 });
      },
      ()=>{}
    )
  }
  confirmChangeEmail(){ // step 2
    let OTP = this.changeEmailForm.value.OTP
    this._auth.confirmChangeEmail({otp:OTP}).subscribe(
      (res:any)=>{
        this.toastr.success('Your Email was chnaged successfully', 'Success', { timeOut: 9000 });
        this.changeEmailForm.reset()
      },
      (e)=>{
        console.log(e)
        this.toastr.error('OTP was wrong , please try again', 'Error', { timeOut: 9000 });
      },
      ()=>{}
    )
  }
}
