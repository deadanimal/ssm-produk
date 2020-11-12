import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  // URL
  public transactionsURL: string = environment.baseUrl + 'v1/transactions/';
  public dropdownsURL: string = environment.baseUrl + 'v1/refund-dropdowns/';

  constructor(private http: HttpClient) {}

  // Transactions
  getTransactions(): Observable<any> {
    let urlTemp = this.transactionsURL + '?ordering=-created_date'
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        // console.log('Topics: ', res)
        // this.tickets = res
      })
    )
  }

  getTransactionsWCart(): Observable<any> {
    let urlTemp = this.transactionsURL + 'with_cart/' + '?ordering=-created_date'
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        // console.log('Topics: ', res)
        // this.tickets = res
      })
    )
  }

  getDropdowns(): Observable<any> {
    let urlTemp = this.dropdownsURL + '?ordering=-created_date'
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        // console.log('Topics: ', res)
        // this.tickets = res
      })
    )
  }

  createDropdown(body: any): Observable<any> {
    return this.http.post<any>(this.dropdownsURL, body).pipe(
      tap((res) => {
        // console.log('Topics: ', res)
        // this.reply = res
      })
    )
  }

  patchDropdown(id, body: any): Observable<any> {
    let urlTemp = this.dropdownsURL + id + '/'
    return this.http.patch<any>(urlTemp, body).pipe(
      tap((res) => {
        // console.log('Topics: ', res)
        // this.reply = res
      })
    )
  }
}
