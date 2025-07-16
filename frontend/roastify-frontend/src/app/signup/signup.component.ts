declare const google:any;
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISignUp } from '../interfaces/ISignUp';
import { FileuploadService } from '../fileupload.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements AfterViewInit{
  @Output() close = new EventEmitter<void>();
  constructor(private service: FileuploadService,private authService : AuthService){}
  ngAfterViewInit(){
    setTimeout(() => {
      google.accounts.id.initialize({
        client_id:"690607705647-cfffmapsnsgarpte5iem1208abcbpa8i.apps.googleusercontent.com",
        callback:this.OnGoogleLogin.bind(this)
      })
      const btn = document.getElementById("googleBtn");
      if(btn){
        google.accounts.id.renderButton(
          document.getElementById("googleBtn"),
          {theme:"outline",size:"large"}
        )
      }
    },1000);
  }
  onCloseModal(){
    
    this.close.emit();
  }
  OnGoogleLogin(response:any){
    const token = response.credential;
    console.log(token);
    this.service.SignUp(token).subscribe(
      (responseValidStatus) => {
        this.authService.setUserName(responseValidStatus.user);
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
          modal.remove();
        }
      },
      (responseValidErrorStatus) => {
        console.log(`${responseValidErrorStatus}`);
      },
      () => {console.log("Google Login Successfully Executed..");}
    )
  }
}
