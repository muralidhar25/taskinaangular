import { Component } from "@angular/core";
import { PaymentMethodsService } from "./payment-methods.service";

@Component({
  selector: "payment-methods",
  templateUrl: "./payment-method.component.html",
  styleUrls: ["./style.scss"]
})
export class PaymentMethodsComponent {
  success: string = "";
  errors: string = "";
  card: boolean;
  tac: boolean = false;
  new: boolean = false;
  update: boolean = false;
  cardDetails: any;
  isButtonVisible = false;
  FormFieldShow: boolean = true;
  newCard = {
    name: "",
    number: "",
    month: "01",
    year: "2020",
    cvv: "",
    add1: "",
    add2: "",
    zip_id: ""
  };

  constructor(private payService: PaymentMethodsService) {}

  onFormSubmit() {
    this.payService
      .addNewCard(
        this.newCard.name,
        this.newCard.number,
        this.newCard.month,
        this.newCard.year,
        this.newCard.cvv,
        this.newCard.add1,
        this.newCard.add2,
        this.newCard.zip_id
      )
      .subscribe(
        res => {
          this.new = false;
          this.update = false;
          this.isButtonVisible = false;
          this.success = "New Card Added Successfully";
          setTimeout(() => {
            this.success = "";
          }, 2000);
        },
        errors => {
          console.log(errors);
          if (errors.status == 400) {
            errors.error.errors[0].forEach(error => {
              this.errors = `<div>${error.message}<div>`;
            });
          } else {
            this.errors = `Internal Server Error`;
          }
        }
      );
  }

  ngOnInit() {
    this.payService.getCards().subscribe(res => {
      this.cardDetails = res;
      console.log(res);
      this.isButtonVisible =
        this.cardDetails === null || this.cardDetails === undefined;
      if (!this.isButtonVisible) {
        this.newCard = {
          name: this.cardDetails.name,
          month: this.cardDetails.month,
          year: this.cardDetails.year,
          cvv: this.cardDetails.cvv,
          add1: "",
          add2: "",
          zip_id: "",
          number: ""
        };
      }
    });
  }

  saveCard(form) {
    if (this.new) {
      if (this.tac && form.valid) {
        this.onFormSubmit();
      } else {
        if (!this.tac) this.errors = "Please Read Terms and Conditions";
        else this.errors = "All Fields Are Required";
      }
    } else {
      this.updateCard();
    }
  }

  updateCard() {
    this.payService
      .updateCard(
        this.newCard.name,
        this.newCard.number,
        this.newCard.month,
        this.newCard.year,
        this.newCard.cvv
      )
      .subscribe(
        res => {
          if (res.success) {
            this.new = false;
            this.update = false;
            this.isButtonVisible = false;
            this.success = "Card Updated Successfully";
            setTimeout(() => {
              this.success = "";
            }, 2000);
          }
        },
        err => {
          this.errors = "Internal Server Error";
        }
      );
  }
}
