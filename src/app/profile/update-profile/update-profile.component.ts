import { Component, OnInit } from '@angular/core';
import { ProfileService, ProfileUpdate } from '../profile.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Account, Locations} from '../model';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { PostTaskDialogService } from "../../shared/dialogs/post-task-dialog/post-task-dialog.service";
import { environment } from "../../../environments/environment";
import { AfterSignupService } from "../../Auth/signup/after-signup/after-signup-dialog.service";
import { BaseStepComponent } from "../../shared/dialogs/stepCount/model";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['../profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  imgURL: any;
  selectedFile: File;
  userProfileImgClass: string;
  showImagePreview: boolean = false;
  isLoaded: boolean;
  profile: FormGroup;
  submitted = false;
  errorMsg;
  successMsg;
  model: Account;
  stopSearch: ISubscription;
  zipCodesArr: string[] = [];
  location: Locations;
  skillsAr: string[] = [];
  private getSub:ISubscription;
  // public userDetail: UserDetail;
  showskills: boolean;
  searchstop: ISubscription;
  minDate: Date;
  maxDate: Date;
  myDateValue: Date;


  loggedInUser = {
    first_name: localStorage.getItem(environment.storage.auth.firstName),
    last_name: localStorage.getItem(environment.storage.auth.lastName),
    profile_pic: localStorage.getItem(environment.storage.auth.thumbnailImageName)
  };

updateProfile = new ProfileUpdate();
  constructor( 
    private profileSvc:ProfileService,
    private profSvc: ProfileService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postTaskSvc: PostTaskDialogService,
    private afterSignupSvc: AfterSignupService,
    private datepipe: DatePipe
   )
{}


onSubmit(form:any) {

  this.submitted=true;
  if(form.invalid){
    this.errorMsg = "All the fields should be filled"
    return;
  }
  else{

    this.updateProfile.first_name=this.model.first_name
    this.updateProfile.last_name=this.model.last_name
    this.updateProfile.email=this.model.email
    this.updateProfile.dob=this.model.dob.toDateString()
    this.updateProfile.zip_code_id=this.model.zip_code_id
    this.updateProfile.tag_line=this.model.tag_line
    this.updateProfile.about_you=this .model.description
    this.updateProfile.profile_pic=this.model.profile_pic
   this.updateProfile.get_things_done=this.model.get_things_done
   this.updateProfile.earn_money=this.model.earn_money
  
    this.profileSvc
  .updateProfile(
    this.updateProfile.first_name,
    this.updateProfile.last_name,
    this.updateProfile.email,
    this.updateProfile.dob,
    this.updateProfile.zip_code_id,
    this.updateProfile.tag_line,
   this.updateProfile.about_you,
   this.updateProfile.profile_pic,
   this.updateProfile.get_things_done,
   this.updateProfile.earn_money

     ).subscribe(
    r=>{

      this.errorMsg = this.profSvc.errorMessage;
     window.location.reload();
    }
  )
 
}
   }


ngOnInit() {
    this.location = new Locations();
    this.getSub = this.route.data.subscribe((data:{ account:Account}) =>{
    this.onBuildModel(data.account);
    this.myDateValue = new Date();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 100)
})

  }
  private onBuildModel(data:Account){
      this.model = data;
      this.postTaskSvc.taskLocation(this.model.location.split(',')[0]).subscribe(data1=>{
        this.model.zip_code_id = data1[0].id;
      })
      if(this.model.dob!=null) {
        this.model.dob = new Date(this.model.dob.toString().split("T")[0].replace(/-/g,"/"));
      }
  }

  searchZipCode(event) {
    if (event.length >= 3) {
      this.stopSearch = this.postTaskSvc
        .taskLocation(event)
        .first()
        .subscribe(res => {
          this.zipCodesArr = [];
          let data = JSON.parse(JSON.stringify(res));
          if (data) {
            this.zipCodesArr = data.map(x => x.full_name );
          }
        });
    }
    if (this.zipCodesArr.includes(this.location.loc)) {
      this.stopSearch.unsubscribe();
    }

  }
  searchbar(search){
    this.model.location=search;
   this.postTaskSvc.taskLocation(search.split(',')[0]).subscribe( data => {
      this.model.zip_code_id = data[0].id;
    })
  }



  onFileSelected(e) {
    const reader = new FileReader();
    reader.onload = this.onReaderLoadFile.bind(this);
    let fileList: FileList = e.target.files;

    if (fileList.length > 0) {
      const file = e.target.files[0];
      this.selectedFile = e.target.files[0];
      if (file) {
        if (file.size / 1024 > 2500) {
          alert("Please select file size less than 10mb!");
          return;
        }
        const fileTypes = [
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/x-png"
        ];

        let isCorrectFileType = false;
        fileTypes.forEach(f => {
          if (file.type == f) {
            isCorrectFileType = true;
          }
        });
        if (isCorrectFileType) {
          reader.readAsDataURL(file);
          this.imgURL = file;
    
        
          this.onSendData();
        } else {
          alert("Unsupported file format!");
          return;
        }
      }
      this.userProfileImgClass = 'user-profile-img';
      this.showImagePreview = true;
    }
  }
  onReaderLoadFile(e) {
    const reader = e.target;
    this.imgURL = reader.result;
  }

  onSendData() {
    this.isLoaded = true;
    this.profileSvc.addprofileimage(this.selectedFile).subscribe(r => {
      this.isLoaded = false;
       localStorage.setItem(environment.storage.auth.thumbnailImageName,r.image_url);
       this.loggedInUser.profile_pic=localStorage.getItem(environment.storage.auth.thumbnailImageName);
      
    });
  }
}










