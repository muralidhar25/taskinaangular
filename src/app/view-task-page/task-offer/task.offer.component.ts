import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IDisplayTask } from "../view-task-page.service";
import { DateUtils } from "src/app/utils/date-utils";
import { environment } from "src/environments/environment";
import { ViewTaskService } from "../view-task-page.service";
import { Message } from "../model";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "task-offer",
  templateUrl: "./task-offer.component.html",
  styleUrls: ["../view-task-page.component.scss"]
})
export class TaskOfferComponent {
  @Input() taskData: IDisplayTask;
  @Input() showBid: boolean;
  offers: any;

  offerDetails: any = {
    first_name: "",
    last_name: "",
    profile_pic: "",
    cover_letter: "",
    completion_rate: "",
    total_amount: "",
    rating: 0,
    task: {
      hours: 0
    }
  };
  newComment: any;
  imgURL: any;
  selectedFile: File = null;
  showImagePreview: boolean = false;
  model: Message = {
    words: ""
  };
  slug: string;
  content: string;
  comments: any;
  dateUtils: DateUtils;
  leftDisable: boolean = false;
  rightDisable: boolean = false;
  form: FormGroup;

  constructor(private route: Router, private viewTaskSVC: ViewTaskService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.offers = this.taskData.offers;
    for (let offer of this.offers) {
      let date_past = new Date(offer.updated_at).getTime();
      let date_diff2 = DateUtils.getDateDiff(date_past);
      offer.date_diff = date_diff2;
      offer.comment = offer.comments.map(comment => {
        let date_diff = DateUtils.getDateDiff(
          new Date(comment.created_at).getTime()
        );
        return { ...comment, date_diff };
      });
      if (
        offer.user.slug ==
        localStorage.getItem(environment.storage.auth.userSlug)
      ) {
        offer.showBid = true;
      }
    }
  }

  onReplyClick(slug: string) {
    this.viewTaskSVC.offerDetails(slug).subscribe(data => {
      this.offerDetails = data;
      this.offerDetails.comments.forEach(comment => {
        comment.diff = DateUtils.getDateDiff(
          new Date(comment.created_at).getTime()
        );
      });
      if (this.taskData.offers[0].slug == slug) {
        this.leftDisable = true;
      }
      if (this.taskData.offers[this.taskData.offers.length - 1].slug == slug) {
        this.rightDisable = true;
      }
    });
  }
  onSubmit() {
    this.viewTaskSVC
      .addComment(this.offerDetails.slug, this.model.words, this.selectedFile)
      .subscribe(data => {
        this.offerDetails.comments.push(data);
        this.model.words = "";
        this.selectedFile = null;
      });
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
          "image/x-png",
          "application/pdf",
          "text/txt"
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
      this.showImagePreview = true;
      this.imgURL = file;
    }
  }

  onReaderLoadFile(e) {
    const reader = e.target;
    this.imgURL = reader.result;
  }
}
