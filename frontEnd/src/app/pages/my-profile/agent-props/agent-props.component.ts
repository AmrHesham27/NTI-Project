import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/user/auth-user.service';

@Component({
  selector: 'app-agent-props',
  templateUrl: './agent-props.component.html',
  styleUrls: ['./agent-props.component.css']
})
export class AgentPropsComponent implements OnInit {

  constructor(private _auth: AuthUserService) { }
  /* problem i faced : while in this page user can delete property then function show properties 
  will try to get one property from the data that doesnot not exist, 
   */
  ngOnInit(): void {
    this.showMyProperties()
  }
  properties:any = []
  showMyProperties(){
    this._auth.showMyProperties().subscribe(
      (res:any)=>{
        console.log(res)
        this.properties = res['data']
      },
      (e)=>{
        console.log(e)
      },
      ()=>{}
    )
  }
  deleteProperty(id: string) {
    this.properties = this.properties.filter((i:any) => {i._id != id})
  }
}