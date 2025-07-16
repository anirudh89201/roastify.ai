import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http : HttpClient) { }
  SendFile(UploadedFile: File | null): Observable<any> {
    if (!UploadedFile) {
      return throwError(() => new Error('No file provided'));
    }
    const formData = new FormData();
    formData.append('file', UploadedFile);

    return this.http.post<string>(`${environment.API_URL}/api/upload`, formData).pipe(catchError(this.errorHandler));
  }
  SignUp(token:string):Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/api/auth/google`,{token},{withCredentials:true}).pipe(catchError(this.errorHandler));
  }
  errorHandler(HttpError: HttpErrorResponse): Observable<never> {
    console.error(HttpError);
    return throwError(() => HttpError);
  }
  AuthenticationCheck(){
    return this.http.get(`${environment.API_URL}/api/auth/status`,{withCredentials:true}).pipe(catchError(this.errorHandler));
  }
  LogOutUser():any{
    return this.http.post<any>(`${environment.API_URL}/api/auth/removeUser`,{},{withCredentials:true}).pipe(catchError(this.errorHandler));
  }
}
