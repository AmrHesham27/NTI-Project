import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/user/auth-user.service';

@Component({
  selector: 'app-delete-my-account',
  templateUrl: './delete-my-account.component.html',
  styleUrls: ['./delete-my-account.component.css']
})
export class DeleteMyAccountComponent implements OnInit {

  constructor(private _auth:AuthUserService, private router:Router) { }

  ngOnInit(): void {
  }
  failMessage:string = ''
  deleteAccount(){
    this._auth.deleteMyAccount().subscribe(
      (res:any)=>{
        console.log(res)
      },
      (e)=>{
        console.log(e)
        this.failMessage = 'please try again'
      },
      ()=>{}
    )
  }
}
