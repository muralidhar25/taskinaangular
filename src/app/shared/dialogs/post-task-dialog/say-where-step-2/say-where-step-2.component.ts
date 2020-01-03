import {
  Component,
  ViewChild,
  OnDestroy,
  ElementRef,
  ɵConsole,
  Input
} from "@angular/core";
import { Step2 } from "../model";
import { BaseStepComponent } from "../../stepCount/model";
import { PostTaskDialogService } from "../post-task-dialog.service";
import { ILocationResponse } from "../post-task-dialog.service";
import { DatePipe } from "@angular/common";
import { ISubscription } from "rxjs/Subscription";

// import { ngfModule, ngf } from 'angular-file';

@Component({
  selector: "say-where-step",
  styleUrls: ["../style.scss"],
  templateUrl: "./say-where-step-2.component.html",
  providers: [DatePipe]
})
export class SayWhereStepComponent extends BaseStepComponent {
  @Input() tasks: Step2;
  zipCodesArr: string[] = [];
  zipCodesObjArr: any[] = [];
  myDateValue: Date;
  minDate: Date;
  certainTime = false;
  zip_code: string;
  error: string;
  stopSearch: ISubscription;
  timeofday: boolean;
  zipResponse: any[]

  constructor(
    el: ElementRef,
    private postTaskSvc: PostTaskDialogService,
    private datePipe: DatePipe
  ) {
    super();
  }

  radioToggle(event) { }

  partOfDay(event) {
    // if (event.target.name == "timeofday") { 
    //   this.timeofday == true; 
    // }
    // else { this.timeofday == false; }
    if (event.target.checked == true) {
      let x = event.target.defaultValue;

      this.tasks.taskPartOfDay = x;
    }
  }
  //  else if (event.target.checked == false) {
  //   this.tasks.taskPartOfDay = "null";
  // }
  searchZipCode(event) {
    if (event.length >= 3) {
      this.stopSearch = this.postTaskSvc
        .taskLocation(event)
        .first()
        .subscribe(res => {
          this.zipCodesArr = [];
          this.zipCodesObjArr = [];
          let data = JSON.parse(JSON.stringify(res));
          this.zipResponse = data
          for (let i = 0; i < data.length; i++) {
            this.zipCodesArr.push(data[i].full_name);
            this.zipCodesObjArr.push(data[i]);
          }
        });
    }
    if (this.zipCodesArr.includes(this.tasks.taskLocation)) {
      this.stopSearch.unsubscribe();
    }
  }
  onSendData(form: any) {

    if (this.tasks.taskIdType == "0") {
      if (this.tasks.taskLocation != "") {
        this.zipResponse.forEach(zip => {
          if (zip.full_name == this.tasks.taskLocation) {
            this.zip_code = zip.id
          }
        })
      }
      // else if (this.tasks.taskLocation == "") {
      //   this.zip_code = null;
      // }
    }
    else if (this.tasks.taskIdType == "1") {
      this.zip_code = null;
      this.tasks.taskPartOfDay = null;
    }

    let date = this.datePipe.transform(this.tasks.taskDate, "yyyy/mm/dd");

    this.postTaskSvc
      .taskData(
        this.tasks.taskIdType,
        this.zip_code,
        this.tasks.taskDate,
        this.tasks.taskPartOfDay
      )
      .first()
      .subscribe(res => {
        this.onNextStep();
      });


  }


  ngOnInit() {
    this.myDateValue = new Date();
    this.minDate = this.myDateValue;
    
  }
}
