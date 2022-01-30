import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private _auth:AuthUserService) { }

  ngOnInit(): void {
  }
  successMssg:string = ''
  failMssg:string = ''
  formEntry:FormGroup = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required])
  })
  onBlur(value:string) : void { this.errorsObject[value] = true }
  changePassword(){
    this._auth.changePassword(this.formEntry.value).subscribe(
      (res:any)=>{
        console.log(res)
        this.successMssg = res.message
        this.formEntry.reset()
      },
      (e)=>{
        console.log(e)
        this.failMssg = 'your old password is wrong'
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
