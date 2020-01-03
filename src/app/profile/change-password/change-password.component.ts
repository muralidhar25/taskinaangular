import { Component } from "@angular/core";
import { ChangePassword, ProfileService } from '../profile.service';
// import { FormControl } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';


@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['../profile.component.scss']
})

export class ChangePasswordComponent {
    changePassword = new ChangePassword();
    errorMsg;
    successMsg;
    profileForm:FormGroup;
    // profileForm = new FormGroup({
    //     curr_pass: new FormControl('', Validators.required),
    //     new_pass: new FormControl(''),
    //     confirm_pass: new FormControl(''),
    //   });
    constructor(private profSvc: ProfileService,
        private fb: FormBuilder ) { }

    onSubmit(form:any) {
   if(form.invalid || !this.changePassword || this.changePassword.new_password != this.changePassword
    .password_confirmation)
    {
        return false;
    }
     else{
        this.profSvc
            .changePassword(this.changePassword.current_password,
                this.changePassword.new_password,
                this.changePassword.password_confirmation)
            .subscribe(res => {
                this.errorMsg = ""
                this.successMsg = res.status;
            }, err => {
                if(err.error.errors[0]){
                    this.errorMsg = err.error.errors[0]
                } else {
                    this.errorMsg = "Internal Server Error"
                }
            this.successMsg = ""
            })     
       }
    }
}