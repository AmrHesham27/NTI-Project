import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/user/auth-user.service';

@Component({
  selector: 'app-prop-card',
  templateUrl: './prop-card.component.html',
  styleUrls: ['./prop-card.component.css']
})
export class PropCardComponent implements OnInit {

  constructor(private _auth:AuthUserService, private router:Router) { }

  ngOnInit(): void {
  }
  // inputs 
  @Input() name:any
  @Input() avatar:any
  @Input() price:any
  @Input() address:any
  @Input() id:any

  avatarPath (avatar:any){
    return `${this._auth.commonApiUrl}/${avatar.replace('.','/')}`
  }
  showProperty(){  
    this.router.navigateByUrl(`/showProperty/${this.id}`)
  }
}
