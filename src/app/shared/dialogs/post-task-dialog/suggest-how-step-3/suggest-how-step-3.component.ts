import {
  Component,
  ElementRef,
  Input
} from "@angular/core";
import { Step3 } from "../model";
import { BaseStepComponent } from "../../stepCount/model";
import { PostTaskDialogService } from "../post-task-dialog.service";

@Component({
  selector: "suggest-how-step",
  styleUrls: ["../style.scss"],
  templateUrl: "./suggest-how-step-3.component.html"
})
export class SuggestHowMuchComponent extends BaseStepComponent {
  @Input() tasks: Step3;
  price: number = 5;
  hours: number = 1;
  finalPrice: number = 5;
  budget: string = "fixed";
  rangeError: boolean = false;
  constructor(el: ElementRef, private postTaskSvc: PostTaskDialogService) {
    super();
  }

  ngOnInit() {
    this.tasks.taskBudget = "0";
  }
  calculatePrice() {

    if (this.tasks.taskBudget == "1") {
      this.finalPrice = this.price * this.hours;
    } else {
      this.finalPrice = this.price;
    }
    if(!this.finalPrice){
      this.finalPrice = 0;
    }
    this.checkRangeError();
  }
  addPrice() {
    if (this.tasks.taskBudget == "1") {
      this.price = (this.price + 1) * this.hours <= 9999 ? (this.price + 1) : this.price;
      this.finalPrice = this.price * this.hours;
    } else {
      this.price = this.finalPrice < 9999 ? (this.price + 1) : this.price;
      this.finalPrice = this.price;
    }
    this.checkRangeError();
  }

  subPrice() {
    if (this.tasks.taskBudget == "1") {
      this.price = (this.price - 1) * this.hours > 5 ? (this.price - 1) : this.price;
      this.finalPrice = this.price * this.hours;
    } else {
      this.price = this.finalPrice > 5 ? (this.price - 1) : this.price;
      this.finalPrice = this.price;
    }
    this.checkRangeError();
  }

  addHours() {
    this.hours = this.price * (this.hours + 1) <= 9999 ? (this.hours + 1) : this.hours;
    this.finalPrice = this.price * this.hours;
    this.checkRangeError();
  }

  subHours() {
    this.hours = this.hours > 1 ? (this.hours - 1) : this.hours;
    this.finalPrice = this.price * this.hours;
    this.checkRangeError();
  }

  checkRangeError() {
    return this.rangeError = this.finalPrice < 5 || this.finalPrice > 9999;
  }

  budgetSelection(val) {
    this.budget = val;

    if (val === "hourly") {
      this.tasks.taskBudget = "1";
    } else {
      this.tasks.taskBudget = "0";
      this.hours = 1;
      this.finalPrice = this.price;
    }
  }

  onSendData(form: any) {
    if (!this.checkRangeError()) {
      this.postTaskSvc
        .taskOfferPrice(
          this.tasks.taskBudget,
          this.price.toString(),
          this.hours.toString()
        )
        .first()
        .subscribe(res => res);
      this.onNextStep();
    }

  }
}
