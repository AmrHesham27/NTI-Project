import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Error404Component } from './pages/error404/error404.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ActivateComponent } from './pages/activate/activate.component';
import { NavbarUserComponent } from './shared/navbar/navbar.component';
import { AutheticationGuard } from './guard/authetication.guard';
import { ChangePasswordComponent } from './pages/security/change-password/change-password.component';
import { LogoutAllComponent } from './pages/security/logout-all/logout-all.component';
import { ChangeEmailComponent } from './pages/security/change-email/change-email.component';
import { PropCardComponent } from './shared/prop-card/prop-card.component';
import { ShowPropertyComponent } from './pages/show-property/show-property.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './pages/search/search.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { FoooterComponent } from './shared/footer/footer.component';
import { DeleteMyAccountComponent } from './pages/security/delete-my-account/delete-my-account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllFavComponent } from './pages/profile-properties/all-fav/all-fav.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SendNewPasswordComponent } from './pages/send-new-password/send-new-password.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    Error404Component,
    MyProfileComponent,
    ActivateComponent,
    NavbarUserComponent,
    ChangePasswordComponent,
    LogoutAllComponent,
    ChangeEmailComponent,
    PropCardComponent,
    ShowPropertyComponent,
    SearchComponent,
    SideBarComponent,
    FoooterComponent,
    DeleteMyAccountComponent,
    AllFavComponent,
    ForgotPasswordComponent,
    SendNewPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    AutheticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
