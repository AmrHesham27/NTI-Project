import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/user/auth-user.service';

@Component({
  selector: 'app-all-fav',
  templateUrl: './all-fav.component.html',
  styleUrls: ['./all-fav.component.css']
})
export class AllFavComponent implements OnInit {

  constructor(private _auth:AuthUserService) { }
  ngOnInit(): void {
    this._auth.showAllFav().subscribe(
      (res:any)=>{
        this.properties = res['data']
        console.log(res)
      },
      (e)=>{
        console.log(e);
      },
      ()=>{}
    )
  }
  properties:any = []
}