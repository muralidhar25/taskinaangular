import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { HttpParams, HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

interface IProfileSearchAddress {
  full_name: string;
  id: number;
  code: number;
  city_id: number;
}
@Injectable()
export class AfterSignupService {
  private showDialogSource = new Subject<any>();
  public showDialog$ = this.showDialogSource.asObservable();
  constructor(private http: HttpClient) {}

  showDialog(data: any) {
    this.showDialogSource.next(data);
  }

  searchAddress(event) {
    const params = new HttpParams().set("search", event);
    return this.http
      .get<IProfileSearchAddress>(environment.endpoints.tasks.taskLocation, {
        params
      })
      .pipe(
        map(r => {
          
          return r;
        })
      );
  }
}
