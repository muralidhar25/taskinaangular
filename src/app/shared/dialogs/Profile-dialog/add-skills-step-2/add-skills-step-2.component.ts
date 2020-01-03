import { Component, Input } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { BaseStepComponent } from "../../stepCount/model";
import { SkillsDialog } from "../model";
import { ProfileDialogService } from "../profile-dialog.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "profile-addskill-step",
  styleUrls: ["../style.scss"],
  templateUrl: "./add-skills-step-2.component.html"
})
export class ProfileSkillAddComponent extends BaseStepComponent {

  searchedlist = [];
  searchstop: ISubscription;


  addSkillForm: FormGroup;
  submitted = false;
  skills = [];
  texts: string[];

  constructor(
    private profileTaskSvc: ProfileDialogService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.addSkillForm = this.formBuilder.group({
      skills: ['', [Validators.required]],
      do_int_in: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addSkillForm.controls; }

  searchskills(event) {    
    if (event.query.length >= 3) {
      this.searchstop = this.profileTaskSvc
        .getmyskills(event.query)
        .first()
        .subscribe(res => {
          let data = JSON.parse(JSON.stringify(res));
          this.searchedlist = [];
          for (let i = 0; i < data.length; i++) {
            this.searchedlist.push(data[i]);
          }
        });
    }
  }

  onSendData() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.addSkillForm.invalid) {
      return;
    }
    this.profileTaskSvc.updateSkills(this.addSkillForm.value).subscribe(
      data => {
        this.onNextStep();
      },
      err => {
        console.log("error coming");
        const formControl = this.addSkillForm.controls["do_int_in"];
        if (formControl) {
          formControl.setErrors({
            serverError: "Not able to submit response on server."
          });
        }
      } 
    );
  }


}
