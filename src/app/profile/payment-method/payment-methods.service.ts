import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

interface Cards {
  cards: any;
  errors: any;
  success: string;
}

@Injectable()
export class PaymentMethodsService {
  constructor(private http: HttpClient) {}

  getCards() {
    return this.http
      .get<Cards>(environment.endpoints.card.userCard)
      .pipe(map(r => r));
  }

  addNewCard(
    name: string,
    number: string,
    month: string,
    year: string,
    cvv: string,
    add1: string,
    add2: string,
    zip_code_id: string
  ) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const params = {
      credit_card: {
        name: name,
        month: month,
        year: year,
        number: number,
        cvv: cvv
      },
      billing_address: {
        address: add1,
        address_line_2: add2,
        zip_code_id: zip_code_id
      }
    };
    return this.http
      .post<Cards>(environment.endpoints.card.userCard, params, { headers })
      .pipe(map(r => r));
  }

  updateCard(
    name: string,
    number: string,
    month: string,
    year: string,
    cvv: string
  ) {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    const params = {
      credit_card: {
        name: name,
        month: month,
        year: year,
        number: number,
        cvv: cvv
      }
    };
    return this.http
      .put<Cards>(environment.endpoints.card.userCard, params, { headers })
      .pipe(map(r => r));
  }
}
