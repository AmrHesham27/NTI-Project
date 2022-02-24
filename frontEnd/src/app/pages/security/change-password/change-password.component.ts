import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private _auth:AuthUserService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  formEntry:FormGroup = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required])
  })
  onBlur(value:string) : void { this.errorsObject[value] = true }
  changePassword(){
    this._auth.changePassword(this.formEntry.value).subscribe(
      (res:any)=>{
        console.log(res)
        this.toastr.success('password was chnaged successfully', 'Success', { timeOut: 9000 });
        this.formEntry.reset()
      },
      (e)=>{
        console.log(e)
        this.toastr.error('your old password is wrong', 'Error', { timeOut: 9000 });
      },
      ()=>{}
    )
  }
  errorsObject:any = {
    oldPass:false,
    newPass:false,
    confirmPass:false
  }
}
