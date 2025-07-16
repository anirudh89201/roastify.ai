import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 🔌 Angular Modules
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 🎉 Third-Party Modules

// 🧩 Your Components
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoastModalComponent } from './app-roast-modal/app-roast-modal.component';
import { FeaturesComponent } from './features/features.component';

// 🧠 Your Services
import { FileuploadService } from './fileupload.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    FileUploadComponent,
    LandingPageComponent,
    AppRoastModalComponent,
    FeaturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [FileuploadService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
