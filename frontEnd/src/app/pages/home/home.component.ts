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
  }
  setValue(e:any, input:any){
    this._auth.searchData[input] = e.target.value
  }
  setBuy(){
    this._auth.searchData.rentOrBuy = 'buy'
  }
  setRent(){
    this._auth.searchData.rentOrBuy = 'rent'
  }
  setPropType(e:any){
    if (e.target.value == 'All'){
      this._auth.searchData.propType = undefined
      return
    }
    this._auth.searchData.propType = e.target.value
  }
  search(){
    this.router.navigateByUrl('/search')
  }
}
