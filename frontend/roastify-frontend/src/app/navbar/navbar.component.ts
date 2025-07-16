import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { FileuploadService } from '../fileupload.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  closeLogin: boolean = false;
  showModal: boolean = false;
  userName: string | null = null;
  private subscription!: Subscription;

  constructor(
    private authservice: AuthService,
    private service: FileuploadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.authservice.userName$.subscribe(name => {
      this.userName = name;
      this.closeLogin = !!name;

      // ✅ Force Angular to update view
      this.cdr.detectChanges();
    });
  }

  OnCloseLogin() {
    console.log('NavbarComponent received close event');
    this.showModal = false;
    this.closeLogin = true;
  }

  onLogin() {
    this.showModal = true;
  }

  onLogOut() {
    this.service.LogOutUser().subscribe(
      (responseValidStatus: any) => {
        console.log(responseValidStatus);
        this.authservice.clearUser();
        alert("User Logout Successfully.");
      },
      (responseValidErrorStatus: any) => {
        console.log(responseValidErrorStatus);
      },
      () => {
        console.log("Log Out User Executed Successfully...");
      }
    );
  }
}
