import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ErrorDialogService {
  private showDialogSource = new Subject<string>();
  public showDialog$ = this.showDialogSource.asObservable();

  showDialog(msg: string) {
    this.showDialogSource.next(msg);
  }
}
