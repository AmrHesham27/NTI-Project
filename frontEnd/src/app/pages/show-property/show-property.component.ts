import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { ActivatedRoute } from '@angular/router';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-property',
  templateUrl: './show-property.component.html',
  styleUrls: ['./show-property.component.css'],
  providers: [NgbCarouselConfig]
})
export class ShowPropertyComponent implements OnInit {

  constructor(
              private _auth:AuthUserService, 
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              config: NgbCarouselConfig
              ) {
                config.showNavigationArrows = true;
                config.showNavigationIndicators = true;
              }
  ngOnInit(): void {
    this.getPropertyData()
    console.log('getPropertyData')
  }
  propertyData:any = null
  favourite:boolean = false
  getPropertyData(){
    let id = this.activatedRoute.snapshot.params['id']
    this._auth.showProperty(id).subscribe(
      (res:any)=>{
        console.log(res)
        this.propertyData = res.data
        this.images = this.getImagesPaths()
        this._auth.userData.favourites.includes(id) ?
            this.favourite = true : this.favourite = false
      },
      (e)=>{
        console.log(e)
      },
      ()=>{}
    )
  }
  getImagesPaths(){
    let avatar = `${this._auth.commonApiUrl}/${this.propertyData.avatar.replace('.', '/')}`
    let images:string[] = []
    if(this.propertyData.gallery != []){
      this.propertyData.gallery
      .forEach((img:string) => images.push(`${this._auth.commonApiUrl}/${img.replace('.', '/')}`))
    }
    return [...images, avatar]
  }
  AddToFavOrDelete(){
    if (this._auth.userData.userType != 'client'){
      this.toastr.error('only customers can have favourite properties', 'Error', { timeOut: 9000 });
      return
    }
    if (!this._auth.isUserLoggedIn){
      this.toastr.error('please login firstly', 'Error', { timeOut: 9000 });
    }
    else {
      let id = this.activatedRoute.snapshot.params['id']
      if(this.favourite){
        this._auth.deleteFavProp(id).subscribe(
          (res:any)=>{
            console.log(res)
            this.favourite = false
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
          this.favourite = true
        },
        (e)=>{
          console.log(e)
        },
        ()=>{}
      )}
    }
  }
  // for carousel 
  showNavigationArrows = true;
  showNavigationIndicators = false;
  images: string[] = []
}
