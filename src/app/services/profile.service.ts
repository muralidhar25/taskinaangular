import { Injectable } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { AuthService } from './auth.service';

interface IProfileUploadResponse{
    status: string,
    image_url: string
}

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient, 
              private authSvc: AuthService) {

  }
  
  uploadImage(imgurl: any) {
    let formData = new FormData();
    formData.append('image', imgurl);
    return this.http
      .post<IProfileUploadResponse>(environment.endpoints.profile.addprofileimage, formData)
      .pipe(map(r => this.onUploadImage(r)))
      .catch((e) => {
        return this.authSvc.onError(e)
      });
   
  }

  private onUploadImage(response: IProfileUploadResponse) {
    if(response.status == 'Image uploaded successfully.')
    {
        localStorage.setItem(environment.storage.auth.thumbnailImageName, response.image_url);
    }
  }

}
