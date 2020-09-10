import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { PaymentGateway } from "./payment_gateway.model";

@Injectable({
  providedIn: "root",
})
export class PaymentGatewaysService {
  // URL
  public urlPaymentGateway: string =
    environment.baseUrl + "v1/PaymentGateways/";

  // Data
  public PaymentGateway: PaymentGateway;
  public PaymentGateways: PaymentGateway[] = [];
  public PaymentGatewaysFiltered: PaymentGateway[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<PaymentGateway> {
    return this.http.post<any>(this.urlPaymentGateway, body).pipe(
      tap((res) => {
        console.log("PaymentGateway: ", res);
      })
    );
  }

  getAll(): Observable<PaymentGateway[]> {
    return this.http.get<PaymentGateway[]>(this.urlPaymentGateway).pipe(
      tap((res) => {
        console.log("PaymentGateways: ", res);
      })
    );
  }

  getOne(id: String): Observable<PaymentGateway> {
    let urlPaymentGatewayOne = this.urlPaymentGateway + id + "/";
    return this.http.get<PaymentGateway>(urlPaymentGatewayOne).pipe(
      tap((res) => {
        console.log("PaymentGateway: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<PaymentGateway> {
    let urlPaymentGatewayOne = this.urlPaymentGateway + id + "/";
    return this.http.put<PaymentGateway>(urlPaymentGatewayOne, body).pipe(
      tap((res) => {
        console.log("PaymentGateway", res);
      })
    );
  }

  filter(field: String): Observable<PaymentGateway[]> {
    let urlFilter = this.urlPaymentGateway + "?" + field + "/";
    return this.http.get<PaymentGateway[]>(urlFilter).pipe(
      tap((res) => {
        console.log("PaymentGateways", res);
      })
    );
  }
}
