import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomerDetail } from './customer_details.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  // URL
  public urlCustomerDetail: string = environment.baseUrl + 'v1/CustomerDetails/'

  // Data
  public CustomerDetail: CustomerDetail
  public CustomerDetails: CustomerDetail[] = []
  public CustomerDetailsFiltered: CustomerDetail[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: Form): Observable<CustomerDetail> {
    return this.http.post<any>(this.urlCustomerDetail, body).pipe(
      tap((res) => {
        console.log('CustomerDetail: ', res)
      })
    )
  }

  getAll(): Observable<CustomerDetail[]> {
    return this.http.get<CustomerDetail[]>(this.urlCustomerDetail).pipe(
      tap((res) => {
        console.log('CustomerDetails: ', res)
      })
    )
  }

  getOne(id: String): Observable<CustomerDetail> {
    let urlCustomerDetailOne = this.urlCustomerDetail + id + '/'
    return this.http.get<CustomerDetail>(urlCustomerDetailOne).pipe(
      tap((res) => {
        console.log('CustomerDetail: ', res)
      })
    )
  }

  update(id: String, body: Form): Observable<CustomerDetail> {
    let urlCustomerDetailOne = this.urlCustomerDetail + id + '/'
    return this.http.put<CustomerDetail>(urlCustomerDetailOne, body).pipe(
      tap((res) => {
        console.log('CustomerDetail', res)
      })
    )
  }

  filter(field: String): Observable<CustomerDetail[]> {
    let urlFilter = this.urlCustomerDetail + '?' + field + '/'
    return this.http.get<CustomerDetail[]>(urlFilter).pipe(
      tap((res) => {
        console.log('CustomerDetails', res)
      })
    )
  }

}
