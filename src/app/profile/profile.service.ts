import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';

export class ChangePassword {
    new_password: string;
    password_confirmation: string;
    current_password: string;
}
interface IProfileUploadResponse{
    status: string,
    image_url: string
  }

export class ProfileUpdate{
    first_name:string;
    last_name:string;
    email:string;
    dob:string;
    zip_code_id:string;
    tag_line:string;
    abn:string;
    about_you:string;
    earn_money:boolean;
    get_things_done:boolean;
    location:string;
    profile_pic:string;
    profile_pic_alt:string;
    profile_pic_present:boolean; 

}
@Injectable()

export class ProfileService {
    errorMessage = '';
    constructor(private http: HttpClient) { }

    changePassword(current_password: string, new_password: string, password_confirmation: string) {
        const params = new HttpParams()
            .set("password", new_password)
            .set("password_confirmation", password_confirmation)
            .set("current_password", current_password);


        const headers = new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );

        return this.http
            .put<any>(environment.endpoints.auth.changePassword, params, { headers })
            .pipe(map(r => r))
    }

    updateProfile(first_name:string, last_name:string, email:string, 
    dob:string, zip_code_id:string , tag_line:string , about_you:string,profile_pic:string , get_things_done:boolean,earn_money:boolean){
       
        return this.http
        .put<ProfileUpdate>(environment.endpoints.profile.updateProfile, {
            first_name, last_name, email, dob, zip_code_id, tag_line, about_you, get_things_done,earn_money  
        })
            .pipe(map(r=>r));
}

userData(){
    
return this.http.get<any>(environment.endpoints.profile.userData).pipe(
  map(r=>{
      return r }));
  
}

addprofileimage(imgURL: File) {
    let formData: FormData = new FormData();
    formData.append('avatar', imgURL, imgURL.name);
    
    return this.http
      .post<IProfileUploadResponse>(
        environment.endpoints.profile.addprofileimage,
        formData
      );
  }

}

                              
