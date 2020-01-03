import {
  Component,
  ViewChild,
  OnDestroy,
  ElementRef,
  ɵConsole,
  Input
} from "@angular/core";
import { ProfileDialog } from "../model";
import { BaseStepComponent } from "../../stepCount/model";
import { ProfileDialogService } from "../profile-dialog.service";
import { BaseDialogComponent } from "../../BaseDialogComponent";
import { ISubscription } from "rxjs/Subscription";
import { ProfileService } from "src/app/services/profile.service";
import { NgForm } from "@angular/forms";
import { patterns } from "../../../view/regex-patterns";
import { ErrorDialogService } from "../../error-dialog/error-dialog.service";
import { Dialog } from "primeng/primeng";
import { ForgotDialogService } from "src/app/Auth/forgot-password/dialog.service";
@Component({
  selector: "profile-mobile-step",
  styleUrls: ["../style.scss"],
  templateUrl: "./add-mobileno-step-3.component.html"
})
export class ProfileMobileComponent extends BaseStepComponent {
  public phoneRegex = patterns.phone;
  contactNo: number;
  otp: number;
  // errormsg: string = "Please enter only numbers";

  constructor(
    private errorDlgSvc: ErrorDialogService,
    private profileSvc: ProfileDialogService
  ) {
    super();
  }
  onSendData(form: NgForm) {
    if (this.contactNo == undefined || form.value.code.length < 10) {
      this.errorDlgSvc.showDialog(
        "Verifiable mobile is not a valid mobile number."
      );
    } else {
      this.sendOTP(event);
    }
  }

  sendOTP(evt) {
    this.profileSvc
      .updateMobileNo("permanent", this.contactNo.toString())
      .subscribe(r => {
      });
  }
 
}
