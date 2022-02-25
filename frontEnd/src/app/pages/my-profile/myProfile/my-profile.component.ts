import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  constructor(public _auth:AuthUserService, 
              private toastr: ToastrService) { }
  ngOnInit(): void {
    console.log('myProfile page')
  }
  returnUserAvatar(){
    let userAvatar
    if (this._auth['userData'] && this._auth['userData']['avatar']){ 
      userAvatar = `${this._auth.commonApiUrl}/${this._auth['userData']['avatar'].replace('.','/')}`
    }
    else {
      userAvatar = 'assets/images/avatar.png'
    }
    return userAvatar
  }  
  myFile:any
  imgURL:any=""
  onChange(event:any){
    this.myFile= event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  onUpload(){
    const formData = new FormData()
    formData.append('image', this.myFile)
    this._auth.addImage(formData).subscribe(
      (res:any)=>{
        console.log(res)
      },
      (e:any)=>{
        console.log(e)
      },
      ()=>{}
    )
  }
  // to edit user
  userName:string = ''
  userPhoneNumber:string = ''
  setUserName(e:any){
    this.userName = e.target.value
  }
  setPhoneNumber(e:any){
    this.userPhoneNumber = e.target.value
  }
  editUser(){
    let body = {
      name:this.userName,
      phoneNumber:this.userPhoneNumber
    }
    this._auth.editUser(body).subscribe(
      (res:any)=>{
        this.toastr.error('user was edited successfully', 'Success', { timeOut: 9000 });
        console.log(res)
      },
      (e)=>{
        this.toastr.error('could not edit user, try again', 'Error', { timeOut: 9000 });
        console.log(e)
      },
      ()=>{}
    )
  }
}