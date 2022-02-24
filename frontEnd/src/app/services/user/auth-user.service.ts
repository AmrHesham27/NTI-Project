import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  public isUserLoggedIn = false
  public userData:User  = {
    userType:'',
    name:'',
    password:'',
    email:'',
    newEmail:'', 
    phoneNumber:'', 
    favourites:[],
    notifications:[],
    tokens:[],
    otp:'',
    activated:false, 
    addresses:[ 
        {
          addrType:'',
          addrContent:'',
          isDefault:false
        }
    ],
    avatar:''
  }
  public searchData:any = {
    minPrice: undefined,
    maxPrice: undefined,
    governorate: 'Cairo',
    rentOrBuy: 'buy',
    propType: undefined,
    address: undefined
  }
  public commonApiUrl:string = 'http://localhost:3000'
  constructor(private _http:HttpClient, private router:Router) { }
  /****** authentican functions *****/
  /* this function should work for the first time the user open the app or when he refresh */
  authenticate(){
    this.me().subscribe(
      (res:any)=>{ 
        this.isUserLoggedIn = true
        this.userData = res['data']
        if (!res['data']['activated']) { this.router.navigateByUrl('/activate') } 
      },
      (e)=>{ 
        this.isUserLoggedIn = false
        console.log(e) 
      },
      ()=>{} 
    )
    return 
  }
  /* this function check if user is logged in or not */
  getProToken(){
    return !!localStorage.getItem('proToken')
  }
  /***** connect to api *****/
  /* no middleware needed */
  register(userData:any){
    return this._http.post(`${this.commonApiUrl}/register`, userData)
  }
  login(userData:any): Observable<any>{
    return this._http.post(`${this.commonApiUrl}/login`, userData)
  }
  forgotPassword(userData:any){
    return this._http.post(`${this.commonApiUrl}/forgotPassword`, userData)
  }
  sendNewPassword(userData:any){
    return this._http.post(`${this.commonApiUrl}/sendNewPassword/${userData.otp}/${userData.email}`, {newPassword : userData.newPassword})
  }
  showProperty(userData:any){
    return this._http.get(`${this.commonApiUrl}/showProperty/${userData}`)
  }
  search(userData:any){
    return this._http.post(`${this.commonApiUrl}/search`, userData)
  }
  /**************************************************************/
  /* Logged In */
  logout(){
    return this._http.post(`${this.commonApiUrl}/logout`, {})
  }
  logoutAll(){
    return this._http.post(`${this.commonApiUrl}/logoutAll`, {})
  }
  sendOtp(){
    return this._http.get(`${this.commonApiUrl}/sendOtp`)
  }
  activate(userData:any){
    return this._http.post(`${this.commonApiUrl}/activate`, userData)
  }
  /**************************************************************/
  /* Logged In and active */
  changePassword(userData:any){
    return this._http.post(`${this.commonApiUrl}/changePassword`, userData)
  }
  editUser(userData:any){
    return this._http.post(`${this.commonApiUrl}/edit`, userData)
  }
  addImage(userData:any){
    return this._http.post(`${this.commonApiUrl}/addAvatar`, userData)
  }
  deleteMyAccount(){
    return this._http.delete(`${this.commonApiUrl}/deleteMyAccount`)
  }
  me(){
    return this._http.get(`${this.commonApiUrl}/me`)
  }
  changeEmail(userData:any){ // step 1
    return this._http.post(`${this.commonApiUrl}/changeEmail`, userData)
  }
  confirmChangeEmail(userData:any){ // step 2
    return this._http.post(`${this.commonApiUrl}/confirmChangeEmail`, userData)
  }
  // send mssg
  // get mssg
  /**************************************************************/  
  /* agents only */
  // add prop
  // edit prop
  // dlete prop
  // all props
  /* only clients */
  addFavProp(userData:any){
    return this._http.post(`${this.commonApiUrl}/addFavProp`, userData)
  }
  deleteFavProp(userData:any){
    return this._http.delete(`${this.commonApiUrl}/deleteFavProp/${userData}`)
  }
  showAllFav(){
    return this._http.get(`${this.commonApiUrl}/showAllFav`)
  }
}
