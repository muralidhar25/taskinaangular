import { Component, ElementRef, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ISubscription } from "rxjs/Subscription";
import { AuthService } from 'src/app/services/auth.service';
import { BaseDialogComponent } from "src/app/shared/dialogs/BaseDialogComponent";
import { ProfileDialogService } from "../../../shared/dialogs/Profile-dialog/profile-dialog.service";
import { User } from "../model";
import { AfterSignupService } from "./after-signup-dialog.service";
import { ConfirmationDialogService } from '../../../shared/dialogs/confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: "aftersignup-dialog",
  styleUrls: ["./styles.scss"],
  templateUrl: "./after-signup-dialog.component.html"
})
export class AfterSignupComponent extends BaseDialogComponent<User>
  implements OnDestroy {
  afterSignupForm: FormGroup;
  submitted = false;
  searchedlist = [];

  private dialogSub: ISubscription;
  public user: User = new User();
  dialogVisible: boolean;
  showskills: boolean;
  skillsAr
  lastkeydown1: number = 0;
  userData: any[] = [];
  suburb_id
  constructor(
    el: ElementRef,
    private afterSignupSvc: AfterSignupService,
    public profilesvc: ProfileDialogService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private confirmationSvc: ConfirmationDialogService) {
    super(User, el, null);
    this.dialogSub = this.afterSignupSvc.showDialog$.subscribe(data => {
      this.afterSignupForm = this.formBuilder.group({
        first_name: [data.firstName ? data.firstName : '', Validators.required],
        last_name: [data.lastName ? data.lastName : '', Validators.required],
        suburb: ['', [Validators.required]],
        get_things_done: [''],
        earn_money: [''],
      });
      this.showDialog();
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.afterSignupForm.controls; }
  closeDialog() {
    if (localStorage.getItem('dialog-close') == "no") {
      this.hideDialog();
      localStorage.setItem('dialog-close', '');
    } else {
      this.confirmationSvc.showDialog({
        title: 'Are you sure you want to leave?',
        message: 'We\'re just getting to know one another!',
        buttonLeft: 'Back',
        userSign: true,
        buttonRight: 'Leave'
      });
    }
  }
  onSendData() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.afterSignupForm.invalid) {
      return;
    }
    this.profilesvc.updateUserInfo(this.afterSignupForm.value).subscribe(r => {
      this.authService.setProfilePic(this.afterSignupForm.value);
      if (this.afterSignupForm.value.earn_money == true && this.afterSignupForm.value.get_things_done == false) {
        this.hideDialog();
        this.profilesvc.showDialog("add profile");
      } else {
        this.hideDialog();
        this.router.navigateByUrl("/dashboard");
      }
    },
      err => {
        console.log(err);
      });
  }
  ngOnInit() { }
  ngOnDestroy() { }

  // searchSuburb() {
  //   let suburb = this.afterSignupForm.controls['suburb'];
  //   suburb.valueChanges.pipe(
  //     // wait for a 200ms pause
  //     debounceTime(200),
  //     // if the value is the same, ignore
  //     // distinctUntilChanged(),
  //     // if an updated value comes through while request is still active cancel previous request and 'switch' to new observable
  //     switchMap(searchTerm => {
  //       console.log("come hereeeeeee for observable");
  //       return this.afterSignupSvc.searchAddress(searchTerm).pipe(
  //         map(x => x),
  //         catchError(e => {
  //           return of([])
  //         }
  //         )
  //       )
  //     })
  //   ).subscribe(res => {
  //     let datas = JSON.parse(JSON.stringify(res));
  //     this.searchedlist = datas;
  //   }

  //   );
  // }

  searchSuburb(event) {

    let searchTerm = event.query;
    this.afterSignupSvc.searchAddress(searchTerm).subscribe(res => {
      let datas = JSON.parse(JSON.stringify(res));
      this.searchedlist = datas;
    });
  }
}
