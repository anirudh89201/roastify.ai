import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userNameObject = new BehaviorSubject<string|null>(localStorage.getItem('name'));
  public userName$ = this.userNameObject.asObservable();
  setUserName(name:string){
    localStorage.setItem("name",name);
    this.userNameObject.next(name);
  }
  checkUserName():boolean{
    if(localStorage.getItem("name")){
      return true;
    }
    return false;
  }
  clearUser(){
    localStorage.removeItem("name");
    this.userNameObject.next(null);
  }
}
