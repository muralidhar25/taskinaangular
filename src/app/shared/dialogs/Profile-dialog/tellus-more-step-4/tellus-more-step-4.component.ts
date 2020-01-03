import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BaseStepComponent } from "../../stepCount/model";
import { ProfileDialogService } from '../profile-dialog.service';

@Component({
  selector: "profile-tellusmore-step",
  styleUrls: ["../style.scss"],
  templateUrl: "./tellus-more-step-4.component.html"
})
export class ProfileTellUsMoreComponent extends BaseStepComponent {
  valid: boolean = true;
  description: string;

  constructor(private profileSvc: ProfileDialogService) {
    super()
  }

  onSendData(form: NgForm) {
    if (form.invalid) {
      this.valid = false;
      return;
    }
    this.profileSvc.addDescription(this.description).subscribe(res => { console.log(res) })
    this.onNextStep();
  }
}
