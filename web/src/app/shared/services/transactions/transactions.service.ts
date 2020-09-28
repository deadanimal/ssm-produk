import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Transaction } from "./transactions.model";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  // URL
  public urlTransaction: string = environment.baseUrl + "v1/transactions/";

  // Data
  public transaction: Transaction;
  public transactions: Transaction[] = [];
  public transactionsFiltered: Transaction[] = [];
  public encodedData: any

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Transaction> {
    return this.http.post<any>(this.urlTransaction, body).pipe(
      tap((res) => {
        this.transaction = res
        console.log("Transaction: ", res);
      })
    );
  }

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.urlTransaction).pipe(
      tap((res) => {
        this.transactions = res
        console.log("Transactions: ", res);
      })
    );
  }

  getOne(id: String): Observable<Transaction> {
    let urlTransactionOne = this.urlTransaction + id + "/";
    return this.http.get<Transaction>(urlTransactionOne).pipe(
      tap((res) => {
        this.transaction = res
        console.log("Transaction: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Transaction> {
    let urlTransactionOne = this.urlTransaction + id + "/";
    return this.http.put<Transaction>(urlTransactionOne, body).pipe(
      tap((res) => {
        this.transaction = res
        console.log("Transaction", res);
      })
    );
  }

  filter(field: String): Observable<Transaction[]> {
    let urlFilter = this.urlTransaction + "?" + field;
    return this.http.get<Transaction[]>(urlFilter).pipe(
      tap((res) => {
        this.transactionsFiltered = res
        console.log("Transactions", res);
      })
    );
  }

  encode(body): Observable<any> {
    let urlTemp = this.urlTransaction + this.transaction.id + '/encode/'
    return this.http.post(urlTemp, body).pipe(
      tap((res) => {
        this.encodedData = res
        console.log(this.encodedData)
      })
    )
  }
}
