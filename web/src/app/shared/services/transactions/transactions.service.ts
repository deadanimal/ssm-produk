import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Transaction, TransactionExtended } from './transactions.model';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {

  // URL
  public urlTransactions: string = environment.baseUrl + 'v1/transactions/'
  public urlTransactionsExtended: string = environment.baseUrl + 'v1/transactions/with_cart/'

  // Data
  public transaction: any
  public transactions: any[] = []
  public transactionsFiltered: any[] = []
  public encodedData: any
  public transactionLatest: any

  constructor(private http: HttpClient, private userService: UsersService) {}

  create(body: Form): Observable<any> {
    return this.http.post<any>(this.urlTransactions, body).pipe(
      tap((res) => {
        this.transaction = res
        console.log('Created: ', res);
      })
    );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.urlTransactions).pipe(
      tap((res) => {
        this.transactions = res
        console.log('Transactions: ', res);
      })
    );
  }

  getLatest(): Observable<any> {
    let urlTemp = this.urlTransactions + 'latest_successful/?ordering=-payment_gateway_update_date&user=' + this.userService.currentUser.id
    console.log(urlTemp)
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        this.transactionLatest = res
        console.log('Latest: ', this.transactionLatest)
      })
    )
  }

  getExtended(): Observable<TransactionExtended[]> {
    return this.http.get<TransactionExtended[]>(this.urlTransactionsExtended).pipe(
      tap((res: TransactionExtended[]) => {
        this.transactions = res
        console.log('Transactions: ', res);
      })
    );
  }

  getOne(id: String): Observable<any> {
    let urlTransactionsOne = this.urlTransactions + id + '/';
    return this.http.get<any>(urlTransactionsOne).pipe(
      tap((res) => {
        this.transaction = res
        console.log('Transaction: ', res);
      })
    );
  }

  update(id: String, body: Form): Observable<any> {
    let urlTransactionsOne = this.urlTransactions + id + '/';
    return this.http.put<any>(urlTransactionsOne, body).pipe(
      tap((res) => {
        this.transaction = res
        console.log('Transaction', res);
      })
    );
  }

  filter(field: String): Observable<any[]> {
    let urlFilter = this.urlTransactions + '?' + field;
    return this.http.get<any[]>(urlFilter).pipe(
      tap((res) => {
        this.transactionsFiltered = res
        console.log('Filtered', res);
      })
    );
  }

  encode(body): Observable<any> {
    let urlTemp = this.urlTransactions + this.transaction.id + '/encode/'
    return this.http.post(urlTemp, body).pipe(
      tap((res) => {
        this.encodedData = res
        console.log(this.encodedData)
      })
    )
  }

  updateStatus(id: string, body: Form): Observable<any> {
    let urlTemp = this.urlTransactions + id + '/update_payment_status/'
    return this.http.put(urlTemp, body).pipe(
      tap((res) => {
        // this. = res
        console.log('Updated: ', res)
      })
    )
  }

}
