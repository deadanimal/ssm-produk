import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Receipt } from "./receipt.model";

@Injectable({
  providedIn: "root",
})
export class ReceiptsService {
  // URL
  public urlReceipt: string = environment.baseUrl + "v1/receipts/";

  // Data
  public Receipt: Receipt;
  public Receipts: Receipt[] = [];
  public ReceiptsFiltered: Receipt[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Receipt> {
    return this.http.post<any>(this.urlReceipt, body).pipe(
      tap((res) => {
        console.log("Receipt: ", res);
      })
    );
  }

  getAll(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(this.urlReceipt).pipe(
      tap((res) => {
        console.log("Receipts: ", res);
      })
    );
  }

  getOne(id: String): Observable<Receipt> {
    let urlReceiptOne = this.urlReceipt + id + "/";
    return this.http.get<Receipt>(urlReceiptOne).pipe(
      tap((res) => {
        console.log("Receipt: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Receipt> {
    let urlReceiptOne = this.urlReceipt + id + "/";
    return this.http.put<Receipt>(urlReceiptOne, body).pipe(
      tap((res) => {
        console.log("Receipt", res);
      })
    );
  }

  filter(field: String): Observable<Receipt[]> {
    let urlFilter = this.urlReceipt + "?" + field + "/";
    return this.http.get<Receipt[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Receipts", res);
      })
    );
  }
}
