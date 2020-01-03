import { Component } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
 import {UpdateProfileComponent } from '../profile/update-profile/update-profile.component';
@Component({
    selector: 'taskina-profile-page',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
      constructor(private fb: FormBuilder){}
    }

    