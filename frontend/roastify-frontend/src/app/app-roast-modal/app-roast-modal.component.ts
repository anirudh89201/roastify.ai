import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-app-roast-modal',
  templateUrl: './app-roast-modal.component.html',
  styleUrls: ['./app-roast-modal.component.css']
})
export class AppRoastModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() roastLine:string='';
  @Input() imgPreviewUrl:string|null='';
  closeModal(){
    this.close.emit();
  }
}
