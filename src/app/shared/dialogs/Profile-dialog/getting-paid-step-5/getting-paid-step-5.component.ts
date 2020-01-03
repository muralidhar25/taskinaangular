import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseStepComponent } from "../../stepCount/model";
import { ProfileDialogService } from "../profile-dialog.service";

@Component({
  selector: "profile-gettingpaid-step",
  styleUrls: ["../style.scss"],
  templateUrl: "./getting-paid-step-5.component.html"
})
export class ProfileGettingPaidComponent extends BaseStepComponent {

  gettingPaidForm: FormGroup;
  submitted = false;

  constructor(
    private profileSvc: ProfileDialogService,
    private formBuilder: FormBuilder
  ) {
    super();

    this.gettingPaidForm = this.formBuilder.group({
      accountHolderName: ['', Validators.required],
      routing_number: ['', Validators.required],
      account_number: ['', [Validators.required]]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.gettingPaidForm.controls; }


  onSendData() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.gettingPaidForm.invalid) {
      return;
    }

    this.profileSvc.addbankaccount(this.gettingPaidForm.value).subscribe(r => {
      this.onNextStep();
    },
      error => {
        const validationErrors = error.error.error;
        for (let response of validationErrors) {
          const formControl = this.gettingPaidForm.get(response.attribute);
          if (formControl) {
            formControl.setErrors({
              serverError: response.message
            });
          }
        };
      }
    );
  }

  ngOnInit() { }
}
