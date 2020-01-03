import { Component, ElementRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AfterSignupService } from "../../../../Auth/signup/after-signup/after-signup-dialog.service";
import { BaseStepComponent } from "../../stepCount/model";
import { ProfileDialogService } from "../profile-dialog.service";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "profile-add-step",
  styleUrls: ["../style.scss"],
  templateUrl: "./upload-image-step-1.component.html"
})
export class ProfileUploadComponent extends BaseStepComponent {
  @ViewChild("focusable") focusable: ElementRef;

  imgURL: any;
  selectedFile: File;
  showImagePreview: boolean = false;
  isLoaded: boolean;
  firstletter: string;
  lastletter: string;
  userProfileImgClass: string;
  error: boolean = false;

  constructor(

    private profileSvc: ProfileDialogService,
    el: ElementRef,
    private signupsvc: AfterSignupService
  ) {
    super();
    this.imgURL = "../../assets/images/profile-user.png";
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
        } else {
          alert("Unsupported file format!");
          return;
        }
      }
      this.userProfileImgClass = 'user-profile-img';
      this.showImagePreview = true;
      this.imgURL = file;
    }
  }
  onReaderLoadFile(e) {
    const reader = e.target;
    this.imgURL = reader.result;
  }

  onSendData(form: NgForm) {
    this.isLoaded = true;
    if (this.selectedFile) {
      this.profileSvc.addprofileimage(this.selectedFile).subscribe(r => {
        this.isLoaded = false;
        localStorage.setItem(environment.storage.auth.thumbnailImageName, r.image_url);
        this.onNextStep();
      });
    }else{
      this.error = true;
    }
  }
}
