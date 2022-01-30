import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public _auth:AuthUserService, private router:Router) { }
  ngOnInit(): void {
    this.AllProperties()
  }
  data:any = null
  AllProperties(){
    this._auth.AllProperties().subscribe(
      (res:any)=>{ 
        this.data = res.data
        console.log(res) 
      },
      (e)=>{ console.log(e) },
      ()=>{ }
    )
  }

}
