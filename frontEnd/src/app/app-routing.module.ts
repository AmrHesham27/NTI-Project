import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateComponent } from './pages/activate/activate.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { TestComponent } from './pages/test/test.component';
import { AutheticationGuard } from './guard/authetication.guard';
import { ChangePasswordComponent } from './pages/security/change-password/change-password.component';
import { LogoutAllComponent } from './pages/security/logout-all/logout-all.component';
import { ShowPropertyComponent } from './pages/show-property/show-property.component';
import { Guard2Guard } from './guard/guard2.guard';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent },
  {path:'activate', component:ActivateComponent, canActivate:[Guard2Guard]},
  {path:'', component:HomeComponent, canActivate:[Guard2Guard]},
  {path:'showProperty/:id', component:ShowPropertyComponent, canActivate:[Guard2Guard]},
  {path:'myProfile', canActivate:[AutheticationGuard], children:[
    {path:'', component:MyProfileComponent},
    {path:'Security', children:[
      {path:'changePassword', component:ChangePasswordComponent},
      {path:'logoutAll', component:LogoutAllComponent}
    ]}
  ]},
  {path:'test', children:[
    {path:'childOne', component:TestComponent}
  ]},
  {path:'**', component:Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
