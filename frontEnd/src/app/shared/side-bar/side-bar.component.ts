import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/user/auth-user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(public router:Router, public _auth:AuthUserService) { }

  ngOnInit(): void {
  }
  closed: boolean = false // is side bar closed or open? 
  dropDownValues: any = { 
    user : false,
    security : false,
    messages : false,
    properties : false,
  }
  // router function 
  myRouter(link:string){
    this.router.navigateByUrl(`${link}`);
  }
  // open and close sideBar
  openSideBar(){
    this.closed = false
  }
  closeSideBar(){
    this.closed = true;
    this.closeDropDowns()
  }
  // dropdown
  dropDown(entry:string){
    if (!this.closed){
      this.dropDownValues[entry] = this.dropDownValues[entry] ? false : true
    }
  }
  closeDropDowns(){
    let keys = Object.keys(this.dropDownValues)
    keys.forEach(i => this.dropDownValues[i] = false)
  }
}