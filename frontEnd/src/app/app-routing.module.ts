import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AutheticationGuard } from './guard/authetication.guard';
import { AllUsers } from './guard/allUsers.guard';
// pages
import { ActivateComponent } from './pages/activate/activate.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChangePasswordComponent } from './pages/security/change-password/change-password.component';
import { LogoutAllComponent } from './pages/security/logout-all/logout-all.component';
import { ShowPropertyComponent } from './pages/show-property/show-property.component';
import { SearchComponent } from './pages/search/search.component';
import { ChangeEmailComponent } from './pages/security/change-email/change-email.component';
import { DeleteMyAccountComponent } from './pages/security/delete-my-account/delete-my-account.component';
import { NoLoggedInUserGuard } from './guard/no-logged-in-user.guard';
import { AllFavComponent } from './pages/profile-properties/all-fav/all-fav.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SendNewPasswordComponent } from './pages/send-new-password/send-new-password.component';

/***** guards explained ******/
/* we have two gurads 
  1-AutheticationGuard : only logged in and active user can enter this page
  2-AllUsers : all users can enter this page 
why i need AllUsers guard ? 
to get the state of the user visiting the page , whether he is logged in or not. */ 

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
    {path:'myFavourites', component:AllFavComponent}
  ]},
  {path:'**', component:Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }