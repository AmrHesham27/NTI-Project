import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  constructor(private _auth:AuthUserService, private toastr: ToastrService) { }
  ngOnInit(): void {
  }
  form:FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    governorate: new FormControl('', [Validators.required]), 
    address: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    rentOrBuy: new FormControl('', [Validators.required]), 
    propType: new FormControl('', [Validators.required])
  })
  addProperty(){
    // put all inputs in formData
    const formData = new FormData();
    const thisComponent:any = this;
    ['name', 'description', 'governorate', 'address', 'price', 'rentOrBuy', 'propType' ].forEach(
      (i:any) => {formData.append(i, thisComponent[i]?.value)}
    )
    if (this.avatar){
      formData.append('avatar', this.avatar)
    }
    else {
      this.toastr.success('you did not add avatar', 'Error', { timeOut: 9000 });
      return
    }
    if(this.gallery) Array.from(this.gallery).forEach( (i:any) => formData.append('gallery', i) )
    // call the api and send the data
    this._auth.addProperty(formData).subscribe(
      (res:any)=>{
        console.log(res)
        this.toastr.success('property was added', 'Success', { timeOut: 9000 });
      },
      (e)=>{
        console.log(e)
        this.toastr.success('error occurred, please try again', 'Error', { timeOut: 9000 });
      },
      ()=>{}
    )
  }
  get name(){ return this.form.get('name')}
  get description(){ return this.form.get('description')}
  get governorate(){ return this.form.get('governorate')}
  get address(){ return this.form.get('address')}
  get price(){ return this.form.get('price')}
  get rentOrBuy(){ return this.form.get('rentOrBuy')}
  get propType(){ return this.form.get('propType')}
  avatar:any = undefined
  gallery:any = undefined
  onChangeAvatar(event:any){
    this.avatar = event.target.files[0]
  }
  onChnageGallery(event:any){
    this.gallery = event.target.files
  }
}