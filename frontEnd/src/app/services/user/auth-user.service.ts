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
  public commonApiUrl:string = 'http://localhost:3000'
  constructor(private _http:HttpClient, private router:Router) { }
  /***** connect to api *****/
  me(){
    return this._http.get(`${this.commonApiUrl}/me`)
  }
  login(userData:any): Observable<any>{
    return this._http.post(`${this.commonApiUrl}/login`, userData)
  }
  logout(){
    return this._http.post(`${this.commonApiUrl}/logout`, {})
  }
  logoutAll(){
    return this._http.post(`${this.commonApiUrl}/logoutAll`, {})
  }
  register(userData:any){
    return this._http.post(`${this.commonApiUrl}/register`, userData)
  }
  sendOtp(){
    return this._http.get(`${this.commonApiUrl}/sendOtp`)
  }
  changePassword(userData:any){
    return this._http.post(`${this.commonApiUrl}/changePassword`, userData)
  }
  activate(userData:any){
    return this._http.post(`${this.commonApiUrl}/activate`, userData)
  }
  addImage(userData:any){
    return this._http.post(`${this.commonApiUrl}/addAvatar`, userData)
  }
  editUser(userData:any){
    return this._http.post(`${this.commonApiUrl}/edit`, userData)
  }
  AllProperties(){
    return this._http.get(`${this.commonApiUrl}/AllProperties`)
  }
  showProperty(userData:any){
    return this._http.get(`${this.commonApiUrl}/showProperty/${userData}`)
  }
  addFavProp(userData:any){
    return this._http.post(`${this.commonApiUrl}/addFavProp`, userData)
  }
  deleteFavProp(userData:any){
    return this._http.delete(`${this.commonApiUrl}/deleteFavProp/${userData}`)
  }
}
