import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AutheticationGuard } from './guard/authetication.guard';
import { AllUsers } from './guard/allUsers.guard';
import { NoLoggedInUserGuard } from './guard/no-logged-in-user.guard';
// pages
import { ActivateComponent } from './pages/authentication/activate/activate.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { MyProfileComponent } from './pages/my-profile/myProfile/my-profile.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { ChangePasswordComponent } from './pages/my-profile/security/change-password/change-password.component';
import { LogoutAllComponent } from './pages/my-profile/security/logout-all/logout-all.component';
import { ShowPropertyComponent } from './pages/show-property/show-property.component';
import { SearchComponent } from './pages/search/search.component';
import { ChangeEmailComponent } from './pages/my-profile/security/change-email/change-email.component';
import { DeleteMyAccountComponent } from './pages/my-profile/security/delete-my-account/delete-my-account.component';
import { AllFavComponent } from './pages/my-profile/all-fav/all-fav.component';
import { ForgotPasswordComponent } from './pages/authentication/forgot-password/forgot-password.component';
import { SendNewPasswordComponent } from './pages/authentication/send-new-password/send-new-password.component';
import { AgentPropsComponent } from './pages/my-profile/agent-props/agent-props.component';
import { AddPropertyComponent } from './pages/my-profile/add-property/add-property.component';

/***** guards explained ******/
/* 
  we have three gurads 
    1-AutheticationGuard : only logged in and active user can enter this page
    2-AllUsers : all users can enter this page 
    3-noLoggedIn : logged in users can not enter this page
*/ 

const routes: Routes = [
  {path:'login', component:LoginComponent, canActivate:[NoLoggedInUserGuard]},
  {path:'register', component:RegisterComponent, canActivate:[NoLoggedInUserGuard]},
  {path:'forgotPassword', component:ForgotPasswordComponent, canActivate:[NoLoggedInUserGuard]},
  {path:'sendNewPassword/:otp/:email', component:SendNewPasswordComponent, canActivate:[NoLoggedInUserGuard]},
  {path:'activate', component:ActivateComponent, canActivate:[AllUsers]},
  {path:'', component:HomeComponent, canActivate:[AllUsers]},
  {path:'showProperty/:id', component:ShowPropertyComponent, canActivate:[AllUsers]},
  {path:'search', component:SearchComponent, canActivate:[AllUsers]},
  {path:'myProfile', canActivate:[AutheticationGuard], children:[
    {path:'', component:MyProfileComponent},
    {path:'Security', children:[
      {path:'changePassword', component:ChangePasswordComponent},
      {path:'logoutAll', component:LogoutAllComponent},
      {path:'changeEmail', component:ChangeEmailComponent},
      {path:'deleteMyAccount', component:DeleteMyAccountComponent}
    ]},
    {path:'myFavourites', component:AllFavComponent},
    {path:'myProperties', component:AgentPropsComponent},
    {path:'addProperty', component:AddPropertyComponent}
  ]},
  {path:'**', component:Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }