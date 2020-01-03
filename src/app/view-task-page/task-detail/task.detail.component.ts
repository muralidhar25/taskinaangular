import { LoaderService } from './../../shared/services/loader.service';
import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import 'rxjs/add/operator/map';
import { ITaskResponse } from "../../shared/dialogs/post-task-dialog/post-task-dialog.service";
import { MakeAnOfferDialogService } from '../make-an-offer/make-an-offer.service';
import { IDisplayTask, ViewTaskService } from '../view-task-page.service';

@Component({
  selector: "task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["../view-task-page.component.scss"]
})
export class TaskDetailComponent {
  @Input() taskData: IDisplayTask;
  @Input() taskList: ITaskResponse;
  @Input() posterLoggedIn: boolean = false;
  @ViewChild("file") file: ElementRef;
  taskDetail: any;
  status: string;
  edit: boolean = false

  imgURL: any;
  selectedFile: File;

  constructor(
    private viewTaskSvc: ViewTaskService,
    private makeAnOfferSvc: MakeAnOfferDialogService,
    private taskSvc: ViewTaskService,
    private loaderService: LoaderService

  ) { }

  ngOnInit() {

    this.taskDetail = this.taskData;


  }
  ngOnChanges() {
    this.taskDetail = this.taskData;

  }
  confirmOffer() {
    this.makeAnOfferSvc.showDialog("To confirm your offer");
  }

  toggleFollow() {
    this.taskSvc.followUnfollowTask(this.taskDetail.slug).subscribe(res => {
      this.taskDetail.follow = res.followed;
    });
  }

  onFileSelected(e) {
    let fileList: FileList = e.target.files;
    if (fileList.length > 0) {
      const file = e.target.files[0];
      this.selectedFile = e.target.files[0];
      if (file) {
        if (file.size / 1024 > 2500) {
          alert("Please select file size less than 10mb!");
          return;
        }
        this.loaderService.show();
        this.sendAttachment();
      }
    }
  }


  sendAttachment() {
    this.viewTaskSvc.addAttachment(this.selectedFile, this.taskDetail.slug)
      .subscribe(r => {
        this.file.nativeElement.value = "";
        let attachment = {
          "file_name":r.filename,
          "attachment_url":r.url
        }
        this.taskDetail.associations_attachments.push({
          "attachment":attachment
        });
        this.loaderService.hide();
      });
  }
}
