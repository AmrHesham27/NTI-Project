import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/user/auth-user.service';
import { ToastrService } from 'ngx-toastr';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prop-card',
  templateUrl: './prop-card.component.html',
  styleUrls: ['./prop-card.component.css']
})
export class PropCardComponent implements OnInit {

  constructor(private _auth:AuthUserService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  // inputs 
  @Input() name:any
  @Input() avatar:any
  @Input() price:any
  @Input() address:any
  @Input() id:any
  @Input() desc:any
  @Input() noOfViews:any
  // for delete button
  @Input() Delete: any
  @Output() sendIdEvent= new EventEmitter<string>();
  sendIdToParent() {
    this.sendIdEvent.emit(this.id);
  }
  deleteProperty(){
    this._auth.deleteProperty(this.id).subscribe(
      (res:any)=>{
        console.log(res)
        this.toastr.success('property was deleted', 'Success', { timeOut: 9000 });
        console.log(this.id)
      },
      (e)=>{
        console.log(e)
        this.toastr.error('please try again', 'Error', { timeOut: 9000 });
      }
    )
  }
  deletePropertyFunction(){
    this.sendIdToParent()
    this.deleteProperty()
  }
  avatarPath (avatar:any){
    return `${this._auth.commonApiUrl}/${avatar.replace('.','/')}`
  }
  showProperty(){  
    this.router.navigateByUrl(`/showProperty/${this.id}`)
  }
  
}
