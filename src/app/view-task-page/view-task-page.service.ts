import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { environment } from "src/environments/environment";

export interface IRootResponse {
  result: IDisplayTask[];
  current_page: number;
  per_page: number;
  total_pages: number;
  total_entries: number;
}

export interface IDisplayTask {
  id: number;
  title: string;
  details: string;
  type_id: string;
  zip_code_id: number;
  due_date?: Date;
  part_of_day_id: number;
  pay_type_id: number;
  price: number;
  hours: number;
  status_id: string;
  created_by_id: number;
  updated_by_id: number;
  assigned_to_id?: number;
  slug: string;
  created_at: Date;
  updated_at: Date;
  zip_code: IZipCode;
  created_by: ICreatedBy;
  offers: IOffer[];
  location?: any;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  slug: string;
  profile_pic: string;
  rating: number;
  completion_rate: number;
}

export interface IOffer {
  id: number;
  cover_letter: string;
  amount: number;
  slug: string;
  user_id: number;
  task_id: number;
  created_at: Date;
  updated_at: Date;
  accepted: boolean;
  accepted_by_id?: any;
  comments: Comment[];
  user: IUser;
  showBid?: boolean;
}

export interface ICity {
  id: number;
  name: string;
  state_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IState {
  id: number;
  name: string;
  country_id: number;
  area_codes: string;
  prefix: string;
  time_zone: string;
  created_at: Date;
  updated_at: Date;
}

export interface IZipCode {
  id: number;
  code: string;
  city_id: number;
  created_at: Date;
  updated_at: Date;
  latitude: number;
  longitude: number;
  distance?: any;
  city: ICity;
  state: IState;
}

export interface ICreatedBy {
  id: number;
  first_name: string;
  last_name: string;
  slug: string;
  profile_pic: string;
  rating: number;
  completion_rate: number;
}
export class IConfirmOffer {
  profilePicture: boolean;
  bankAccount: boolean;
  billingAddress: boolean;
  dateOfBith: boolean;
  mobileNumber: boolean;
}

@Injectable()
export class ViewTaskService {
  public all_task: any;
  public taskData: any;
  filteredTasks: any;
  search_term: string;

  filterSubject = new Subject<string>();

  filterObservable$ = this.filterSubject.asObservable();

  private showDialogSource = new Subject<string>();
  public showDialog$ = this.showDialogSource.asObservable();

  constructor(private http: HttpClient) {}

  nextFilterRequest(request) {
    return this.filterSubject.next(request);
  }

  showDialog(title: string) {
    this.showDialogSource.next(title);
  }

  taskDisplay(slug: string) {
    return this.http
      .get<IDisplayTask>(environment.endpoints.tasks.taskDisplay(slug))
      .pipe(map(r => r));
  }

  getTasks() {
    return this.http
      .get<any>(environment.endpoints.tasks.getMyTasks)
      .pipe(map(r => r));
  }

  followUnfollowTask(slug: string) {
    const params = new HttpParams();
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http
      .post<any>(environment.endpoints.tasks.followUnfollowTask(slug), params, {
        headers
      })
      .pipe(map(r => r));
  }

  mineTasks(term: string, searchTerm: string) {
    return this.http
      .get<any>(environment.endpoints.tasks.mineTasks(term, searchTerm))
      .pipe(map(r => r));
  }

  searchTasks(filterRequest: any) {
    let actionUrl = environment.endpoints.tasks.searchTasks + "?";
    actionUrl += this.buildQueryParams(filterRequest);
    return this.http.get<any>(actionUrl).pipe(map(r => r));
  }

  buildQueryParams(request): string {
    const ret = [];
    for (let d in request) {
      if (request[d]) {
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(request[d]));
      }
    }
    return ret.join("&");
  }

  offerDetails(slug: string) {
    return this.http
      .get(environment.endpoints.offer.offerDetails(slug))
      .pipe(map(r => r));
  }

  addComment(slug: string, content: string, imgURL: File) {
    // const params = new HttpParams().set("content", content)
    let formData: FormData = new FormData();
    formData.append("content", content);
    if (imgURL) {
      formData.append("attachment", imgURL, imgURL.name);
    }
    return this.http
      .post(environment.endpoints.offer.addComment(slug), formData)
      .pipe(map(r => r));
  }

    addAttachment(file: any, slug: string) {
      let formData: FormData = new FormData();

      formData.append('attachment', file, file.name);
      formData.append('attachable_type', "task");
      // formData.append('slug', slug);
            
      return this.http
        .post<any>(
          environment.endpoints.tasks.addAttachment(slug),
          formData
        );
    }

}
