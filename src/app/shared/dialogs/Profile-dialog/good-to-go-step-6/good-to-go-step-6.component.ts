import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BaseStepComponent } from "../../stepCount/model";
import * as dialogutils from '../../../dialogs/dialogs-utils';

@Component({
  selector: "profile-goodtogo-step",
  styleUrls: ["../style.scss"],
  templateUrl: "./good-to-go-step-6.component.html"
})
export class ProfileGoodToGoComponent extends BaseStepComponent {
  imgscreen = "../../../../../assets/images/good-to-go.jpg";
  onSendData(form: NgForm) {
    this.onNextStep();
  }

  hideDialog() {
    dialogutils.addScrolling();
  }
}
