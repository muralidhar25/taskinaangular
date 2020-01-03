import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


interface ITaskTitleResponse {
  id: number,
  title: string,
  details: string,
  type_id: number,
  zip_code_id: number,
  due_date: string,
  part_of_day_id: number,
  pay_type_id: string,
  price: string,
  hours: string,
  status_id: string,
  created_by_id: number,
  updated_by_id: number,
  assigned_to_id: number,
  slug: string,
  created_at: string,
  updated_at: string
}

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) {

  }
  
  tasksTitle(taskTitle: string, taskDetails: string)
  {
    const params = new HttpParams()
    .set("task[title]", taskTitle)
    .set("task[details]", taskDetails);

const headers = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded");

    return this.http.post<ITaskTitleResponse>(environment.endpoints.tasks.taskTitle, params, {headers}).pipe(
      map(r=> r)
    );
  }


  taskData(taskSlug: string, taskTypeId: string, taskZipCodeId: string, taskDueDate: string, taskPartOfDay: string)
  {
    const params = new HttpParams()
    .set("type_id", taskTypeId)
    .set("zip_code_id", taskZipCodeId)
    .set("due_date", taskDueDate)
    .set("part_of_day_id", taskPartOfDay);

const headers = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded");

    return this.http.post<ITaskTitleResponse>(environment.endpoints.tasks.tasksData(taskSlug), params, {headers}).pipe(
      map(r=> r)
    );
  }
  getCategories(){
   
    const headers = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded");
    return this.http.get<any>(environment.endpoints.tasks.getCategories, { headers }).pipe(
      map(r => r));
  }

}
