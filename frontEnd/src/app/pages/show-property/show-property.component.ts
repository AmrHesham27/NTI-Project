import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { ActivatedRoute } from '@angular/router';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-show-property',
  templateUrl: './show-property.component.html',
  styleUrls: ['./show-property.component.css']
})
export class ShowPropertyComponent implements OnInit {

  constructor(private _auth:AuthUserService, private activatedRoute: ActivatedRoute) {}
  propertyData:any = null
  getPropertyData(){
    let id = this.activatedRoute.snapshot.params['id']
    this._auth.showProperty(id).subscribe(
      (res:any)=>{
        console.log(res)
        this.propertyData = res.data
        if(this._auth.userData.favourites.includes(id)){
          this.userMssg = 'remove from favourites'
        }
        else {
          this.userMssg = 'add to favourites'
        }
      },
      (e)=>{
        console.log(e)
      },
      ()=>{}
    )
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getPropertyData()
  }
  ngOnInit(): void {
    this.getPropertyData()
  }
  getAvatarPath(){
    return `${this._auth.commonApiUrl}/${this.propertyData.avatar.replace('.', '/')}`
  }
  favButtonText:string = 'Add to favourites'
  userMssg:string = ''
  AddToFavOrDelete(){
    if (!this._auth.isUserLoggedIn){
      this.userMssg = 'you have to login first'
    }
    else {
      let id = this.activatedRoute.snapshot.params['id']
      if(this._auth.userData.favourites.includes(id)){
        this._auth.deleteFavProp(id).subscribe(
          (res:any)=>{
            console.log(res)
          },
          (e)=>{
            console.log(e)
          },
          ()=>{}
        )
      }
      else{
      this._auth.addFavProp({propId:this.propertyData._id}).subscribe(
        (res:any)=>{
          console.log(res)
        },
        (e)=>{
          console.log(e)
        },
        ()=>{}
      )}
    }
  }
}
