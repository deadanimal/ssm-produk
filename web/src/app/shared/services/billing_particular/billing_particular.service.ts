import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { BillingParticular } from "./billing_particular.model";

@Injectable({
  providedIn: "root",
})
export class BillingParticularsService {
  // URL
  public urlBillingParticular: string =
    environment.baseUrl + "v1/BillingParticulars/";

  // Data
  public BillingParticular: BillingParticular;
  public BillingParticulars: BillingParticular[] = [];
  public BillingParticularsFiltered: BillingParticular[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<BillingParticular> {
    return this.http.post<any>(this.urlBillingParticular, body).pipe(
      tap((res) => {
        console.log("BillingParticular: ", res);
      })
    );
  }

  getAll(): Observable<BillingParticular[]> {
    return this.http.get<BillingParticular[]>(this.urlBillingParticular).pipe(
      tap((res) => {
        console.log("BillingParticulars: ", res);
      })
    );
  }

  getOne(id: String): Observable<BillingParticular> {
    let urlBillingParticularOne = this.urlBillingParticular + id + "/";
    return this.http.get<BillingParticular>(urlBillingParticularOne).pipe(
      tap((res) => {
        console.log("BillingParticular: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<BillingParticular> {
    let urlBillingParticularOne = this.urlBillingParticular + id + "/";
    return this.http.put<BillingParticular>(urlBillingParticularOne, body).pipe(
      tap((res) => {
        console.log("BillingParticular", res);
      })
    );
  }

  filter(field: String): Observable<BillingParticular[]> {
    let urlFilter = this.urlBillingParticular + "?" + field + "/";
    return this.http.get<BillingParticular[]>(urlFilter).pipe(
      tap((res) => {
        console.log("BillingParticulars", res);
      })
    );
  }
}
