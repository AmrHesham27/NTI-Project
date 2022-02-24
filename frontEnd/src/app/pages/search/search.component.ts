import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/user/auth-user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public _auth:AuthUserService, private router:Router) { }

  ngOnInit(): void {
    this.search()
    console.log(this._auth.searchData)
  }
  properties:any = []
  search(){
    this._auth.search(this._auth.searchData).subscribe(
      (res:any)=>{ 
        this.properties = res.data
        console.log(res) 
        console.log(this.properties)
      },
      (e)=>{ console.log(e) },
      ()=>{ }
    )
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
}
