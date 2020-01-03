import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable()
export class ConfirmationDialogService {
    private showDialogSource = new Subject<string>();
    public showDialog$ = this.showDialogSource.asObservable();

    constructor(private http: HttpClient) { }

    showDialog(obj: any) {
        this.showDialogSource.next(obj);
    }

    deleteTask(taskSlug: string) {
        
        const headers = new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        return this.http
            .delete<any>(environment.endpoints.tasks.deleteTask(taskSlug), {
                headers
            })
            .pipe(map(r => r));
    }

}
