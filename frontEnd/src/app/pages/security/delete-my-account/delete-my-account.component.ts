import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-my-account',
  templateUrl: './delete-my-account.component.html',
  styleUrls: ['./delete-my-account.component.css']
})
export class DeleteMyAccountComponent implements OnInit {

  constructor(private _auth:AuthUserService, 
              private router:Router, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  failMessage:string = ''
  deleteAccount(){
    this._auth.deleteMyAccount().subscribe(
      (res:any)=>{
        this.toastr.success('Your accounr was deleted successfully', 'Success', { timeOut: 9000 });
      },
      (e)=>{
        console.log(e)
        this.toastr.error('Error happened, please try again', 'Error', { timeOut: 9000 });
      },
      ()=>{}
    )
  }
}
