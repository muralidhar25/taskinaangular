import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { environment } from "src/environments/environment";

export interface ITaskResponse {
  id: number;
  title: string;
  details: string;
  type_id: number;
  zip_code_id: number;
  due_date: string;
  part_of_day_id: string;
  pay_type_id: string;
  price: string;
  hours: string;
  status_id: string;
  created_by_id: number;
  updated_by_id: number;
  assigned_to_id: number;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface ILocationResponse {
  id: number;
  code: number;
  city_id: number;
  full_name: string;
}

interface IDisplayTask {
  status: string;
  subject: string;
  budget: string;
  posted_at: string;
  posted_by: string;
  location: string;
  due_date: string;
  details: string;
  offers: string;
  questions: string;
  part_of_day_id: string;
}
@Injectable()
export class PostTaskDialogService {
  public slug: string;
  public x: string;

  private showDialogSource = new Subject<string>();
  public showDialog$ = this.showDialogSource.asObservable();

  constructor(private http: HttpClient) { }

  showDialog(title: string) {
    this.showDialogSource.next(title);
  }

  tasksTitle(taskTitle: string, taskDetails: string) {
    const params = new HttpParams()
      .set("title", taskTitle)
      .set("details", taskDetails);

    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http
      .post<ITaskResponse>(environment.endpoints.tasks.taskTitle, params, {
        headers
      })
      .pipe(
        map(r => {
          this.slug = r.slug;
          this.x = this.slug;
        })
      );
  }

  taskLocation(event: any) {
    const params = new HttpParams().set("search", event);

    return this.http
      .get<ILocationResponse>(environment.endpoints.tasks.taskLocation, {
        params
      })
      .pipe(map(r => r));
  }

  taskData(
    type_id: string,
    zip_code_id: string,
    due_date: string,
    part_of_day_id: string
  ) {


    const params = new HttpParams()
      .set("slug", this.slug)
      .set("type_id", type_id)
      .set("zip_code_id", zip_code_id)
      .set("due_date", due_date);
    
    if (part_of_day_id) {
      params.set("part_of_day_id", part_of_day_id);
    }

    const headers = new HttpHeaders().set(
      "Content-type",
      "application/x-www-form-urlencoded"
    );

    return this.http
      .put<ITaskResponse>(environment.endpoints.tasks.tasksData(this.slug), params, {
        headers
      })
      .pipe(map(r => r));
  }

  taskOfferPrice(pay_type_id: string, price: string, hours: string) {

    const params = new HttpParams()
      .set("pay_type_id", pay_type_id)
      .set("price", price)
      .set("hours", hours);

    return this.http
      .put(environment.endpoints.tasks.tasksBudget(this.slug), params)
      .pipe(map(r => r));
  }



}
