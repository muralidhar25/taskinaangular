import { Component, ViewChild } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { ErrorDialogService } from "./error-dialog.service";
@Component({
  selector: "taskina-error-dialog",
  styleUrls: ["styles.scss"],
  templateUrl: "./dialog.component.html"
})
export class ErrorDialogComponent {
  dialogVisible: boolean;
  public projectName: string;
  public message: string;
  private dialogSub: ISubscription;
  constructor(private dialogSvc: ErrorDialogService) {
    this.dialogSub = this.dialogSvc.showDialog$.subscribe(msg => {
      this.message = msg;
      this.showDialog();
    });
  }
  showDialog() {
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
  }
}
