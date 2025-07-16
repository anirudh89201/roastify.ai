import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoastModalComponent } from './app-roast-modal.component';

describe('AppRoastModalComponent', () => {
  let component: AppRoastModalComponent;
  let fixture: ComponentFixture<AppRoastModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppRoastModalComponent]
    });
    fixture = TestBed.createComponent(AppRoastModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
