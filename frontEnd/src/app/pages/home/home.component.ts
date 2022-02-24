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
  // user inputs - searchData
  setBuy(){
    this._auth.searchData.rentOrBuy = 'buy'
  }
  setRent(){
    this._auth.searchData.rentOrBuy = 'rent'
  }
  setMaxPrice(e:any){
    this._auth.searchData.maxPrice = e.target.value
  }
  setMinPrice(e:any){
    this._auth.searchData.minPrice = e.target.value
  }
  setAddress(e:any){
    this._auth.searchData.address = e.target.value
  }
  setPropType(e:any){
    if (e.target.value == 'All'){
      this._auth.searchData.propType = undefined
      return
    }
    this._auth.searchData.propType = e.target.value
  }
  setGovernerate(e:any){
    this._auth.searchData.governorate = e.target.value
  }
  // search 
  search(){
    this.router.navigateByUrl('/search')
  }
    
}
