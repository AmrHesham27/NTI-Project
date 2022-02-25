import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  constructor(private router:Router, 
              private _auth:AuthUserService, 
              private toastr: ToastrService) { }
  ngOnInit(): void {
    if(this._auth.isUserLoggedIn && this._auth.userData['activated']){
      this.router.navigateByUrl('/myProfile')
    }
    if(!this._auth.isUserLoggedIn){ this._auth.me().subscribe(
      (res:any)=>{ if (res['data']['activated']) {this.router.navigateByUrl('/myProfile')} },
      (e)=>{ this.router.navigateByUrl('/login') },
      ()=>{}
    )}
  }
  // error variable to show fail message on the input
  otpError:boolean = false
  // get otp value from form for error 
  get otp(){ return this.activate.get('otp')}
  // form activate
  activate:FormGroup = new FormGroup({
    otp: new FormControl("", [Validators.required])
  })
  // function to handle activate
  handleActivate(){
    if(this.activate.valid){
      console.log(this.activate.value)
      this._auth.activate(this.activate.value).subscribe(
        (res:any) => {
          console.log(res.data)
          this.router.navigateByUrl('/myProfile')
        },
        (e)=>{ 
          this.toastr.error('activation otp is wrong', 'Error', { timeOut: 9000 });
          console.log(e) 
        },
        ()=>{
          this._auth.me().subscribe()
        }        
      )
    }
  }
  // send new otp to user's email
  sendOtp(){
    this._auth.sendOtp().subscribe(
      (res:any)=>{ 
        this.toastr.success('New OTP was sent to your Email', 'Success', { timeOut: 9000 }); 
      },
      (e)=>{ console.log(e) },
      ()=>{}
    )
  }
  onBlur(){
    this.otpError = true
  }
}
