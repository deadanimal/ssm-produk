import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Checkout } from "./checkout.model";

@Injectable({
  providedIn: "root",
})
export class CheckoutsService {
  // URL
  public urlCheckout: string = environment.baseUrl + "v1/Checkouts/";

  // Data
  public Checkout: Checkout;
  public Checkouts: Checkout[] = [];
  public CheckoutsFiltered: Checkout[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Checkout> {
    return this.http.post<any>(this.urlCheckout, body).pipe(
      tap((res) => {
        console.log("Checkout: ", res);
      })
    );
  }

  getAll(): Observable<Checkout[]> {
    return this.http.get<Checkout[]>(this.urlCheckout).pipe(
      tap((res) => {
        console.log("Checkouts: ", res);
      })
    );
  }

  getOne(id: String): Observable<Checkout> {
    let urlCheckoutOne = this.urlCheckout + id + "/";
    return this.http.get<Checkout>(urlCheckoutOne).pipe(
      tap((res) => {
        console.log("Checkout: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Checkout> {
    let urlCheckoutOne = this.urlCheckout + id + "/";
    return this.http.put<Checkout>(urlCheckoutOne, body).pipe(
      tap((res) => {
        console.log("Checkout", res);
      })
    );
  }

  filter(field: String): Observable<Checkout[]> {
    let urlFilter = this.urlCheckout + "?" + field + "/";
    return this.http.get<Checkout[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Checkouts", res);
      })
    );
  }
}
