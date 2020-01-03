import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { environment } from "src/environments/environment";
interface IWelcomeTaskina {
  firstname: string;
  lastname: string;
  suburb: string;
}
interface IProfileUpload {
  imgURL: File;
}

interface IProfileUploadResponse{
  status: string,
  image_url: string
}

interface IProfileAddSkills {
  do_int_in: string;
  skills: string[];
}
interface IProfileverifyOTP {
  id: number;
}
interface IaddBankAccount {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  account_number: string;
  routing_number: string;
}
interface IaddBankAccountAddress {
  address: string;
  zip_code_id: string;
}

interface IAddaccountNumber {
  bank_account: IaddBankAccount;
  billing_address: IaddBankAccountAddress;
}

@Injectable()
export class ProfileDialogService {
  private showDialogSource = new Subject<string>();
  public showDialog$ = this.showDialogSource.asObservable();

  constructor(private http: HttpClient) {}

  showDialog(title: string) {

    this.showDialogSource.next(title);
  }

  updateInfo(firstname: string, lastname: string, suburb: string) {
    const params = new HttpParams()
      .set("profile[firstname]", firstname)
      .set("profile[lastname]", lastname)
      .set("profile[suburb]", suburb);

    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http
      .post<IWelcomeTaskina>(environment.endpoints.profile.updateInfo, params, {
        headers
      })
      .pipe(map(r => console.log(r)));
  }

  updateUserInfo(form: any) {

    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json"
    );

    return this.http
      .post<any>(environment.endpoints.profile.updateInfo, {
        "first_name": form.first_name,
        "last_name": form.last_name,
        "suburb": form.suburb.id,
        "get_things_done": form.get_things_done,
        "earn_money": form.earn_money
      }, {
        headers
      });
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

  updateMobileNo(ntype: any, value: any) {
    const params = new HttpParams().set("ntype", ntype).set("value", value);

    const headers = new HttpHeaders().set(
      "Content-type",
      "application/x-www-form-urlencoded"
    );

    return this.http
      .post<any>(environment.endpoints.profile.updateMobileNumber, params, {
        headers
      })
      .pipe(map(r => r));
  }

  addbankaccount(form: any) {
    const headers = new HttpHeaders().set("Content-type", "application/json");

    const firstName = localStorage.getItem("firstname");
    const lastName = localStorage.getItem("lastname");
    const email = localStorage.getItem("profileId");
    let addaccount: IAddaccountNumber = {
      bank_account: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        dob: "1981-11-19",
        account_number: form.account_number,
        routing_number: form.routing_number
      },
      billing_address: {
        address: "111 Main St",
        zip_code_id: "1"
      }
    };

    return this.http
      .post<IAddaccountNumber>(
        environment.endpoints.profile.addBankAccount,
        addaccount,
        {
          headers
        }
      )
      .pipe(map(r => console.log("response is ", r)));
  }

  updateSkills(form) {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    form.skills = form.skills.map(element => element.id);
    

    let profileAddSkills: IProfileAddSkills = {
      do_int_in: form.do_int_in,
      skills: form.skills
    }
    return this.http
      .post<IAddaccountNumber>(
        environment.endpoints.profile.updateSkills,
        profileAddSkills,
        {
          headers
        }
      )
      .pipe(map(r => console.log("response is ", r)));
  }


  getmyskills(event) {
    const params = new HttpParams().set("query", event);

    const headers = new HttpHeaders().set(
      "Content-type",
      "application/x-www-form-urlencoded"
    );

    return this.http
      .get(environment.endpoints.profile.getskills, {
        params
      })
      .pipe(
        map(r => {
          return r;
        })
      );
  }
  verifymobileOTP(id) {
    const params = new HttpParams().set("id", id);

    const headers = new HttpHeaders().set(
      "Content-type",
      "application/x-www-form-urlencoded"
    );

    return this.http
      .post<IProfileverifyOTP>(environment.endpoints.profile.verifyOTP(id), {
        params
      })
      .pipe(map(r => r));
  }

  addDescription (about_you: string) {
    return this.http.post(
        environment.endpoints.profile.updateUserDesc, 
        { about_you },
        {
            headers: {
                "content-type": "application/json"
            }
        }).pipe(map(r => r))
  }

}
