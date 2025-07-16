import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileuploadService } from '../fileupload.service';
import { ISignUp } from '../interfaces/ISignUp';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  constructor(private service : FileuploadService,private FormBuilder : FormBuilder){}
  selectedFile!:File|null;
  UploadForm!:FormGroup;
  user!:ISignUp;
  loading:boolean = false;
  imagePreviewUrl:string|null = null;
  roastLine!:string;
  isLogin!:boolean;
  showRoastModel!:boolean;
  closeLogin:boolean = false;
  isDragOver:boolean = false;
  ngOnInit(): void { 
    this.UploadForm = this.FormBuilder.group({
        File:[null,{validators:[Validators.required]}],
        selectedLanugage:['english',Validators.required]
      })
  }
  onImagePicker(event:Event){
    const input = event.target as HTMLInputElement;
    const file = input && input.files ? input.files[0] : null;
    if(file){
      this.selectedFile = file;
      this.setUploadedFile(this.selectedFile);
    }
  }
  SubmitForm() {
  if (this.UploadForm.valid && this.selectedFile) {
    this.loading = true; // ✅ start loading instantly

    this.service.AuthenticationCheck().subscribe(
      (ResponseValidStatus) => {
        this.isLogin = true;

        // Proceed to file upload
        this.service.SendFile(this.selectedFile).subscribe(
          (responseValidStatus) => {
            this.showRoastModel = true;
            this.roastLine = responseValidStatus.message;
            this.loading = false; // ✅ stop loading
          },
          (responseValidErrorStatus) => {
            this.loading = false; // ✅ stop loading on error
          }
        );
      },
      (responseValidErrorStatus) => {
        this.isLogin = false;
        this.loading = false; // ✅ stop loading
        alert("Please Login and Continue");
      }
    );
  }
}

  OnCloseLogin(){
    this.closeLogin = true;

  }
  closeModal(){
    this.showRoastModel = false;
  }
  onDragOver(event:DragEvent){
    event.preventDefault();
    this.isDragOver = true;
  }
  onDragLeave(event:DragEvent){
    event.preventDefault();
    this.isDragOver = false;
  }
  onDrop(event:DragEvent){
    event.preventDefault();
    this.isDragOver = false;
    if(event.dataTransfer?.files.length){
      this.selectedFile = event.dataTransfer.files[0];
      this.setUploadedFile(this.selectedFile);
      console.log("Dropped File:",this.selectedFile.name);
    }
  }
  setUploadedFile(file:File){
    if(file.type.startsWith("image/")){
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }else{
      this.imagePreviewUrl = null;
    }
  }
  clearUploadedFile(){
    this.selectedFile = null;
    this.imagePreviewUrl = null;
    this.UploadForm.get('File')?.setValue(null);
  }
}
