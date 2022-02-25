import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-new-password',
  templateUrl: './send-new-password.component.html',
  styleUrls: ['./send-new-password.component.css']
})
export class SendNewPasswordComponent implements OnInit {

  constructor(private _auth:AuthUserService, 
              private router:Router, 
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {}
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
          this.toastr.success('password was changed successfully', 'Success', { timeOut: 9000 });
          this.router.navigateByUrl('/login')
        },
        (e)=>{
          console.log(e)
          this.toastr.error('this link is invalid', 'Error', { timeOut: 9000 });
        },
        ()=>{
        }
      )
    }
    else {
      this.toastr.error('password and confirm password do not match', 'Error', { timeOut: 9000 });
    }
  }
  get newPassword(){ return this.form.get('newPassword')}
  get confirm(){ return this.form.get('confirm')}
}
