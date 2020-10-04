import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { Product } from './products.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuotasService {

  // URL
  public urlQuotas: string = environment.baseUrl + 'v1/quotas/'

  // Data
  public quota: any
  public quotas: any[] = []
  public quotasFiltered: any[] = []

  constructor(
    private http: HttpClient
  ) { }

  get(id: string): Observable<any> {
    let urlTemp = this.urlQuotas + id + '/'
    return this.http.get(urlTemp).pipe(
      tap((res) => {
        this.quota = res
        console.log('Quota: ', this.quota)
      })
    )
  }

  update(id: string): Observable<any> {
    let urlTemp = this.urlQuotas + id + '/'
    let body = {
      'quota': this.quota.quota - 1
    }
    return this.http.patch(urlTemp, body).pipe(
      tap((res) => {
        this.quota = res
        console.log('Quota: ', this.quota)
      })
    )
  }

  upgrade(id: string): Observable<any> {
    let urlTemp = this.urlQuotas + id + '/'
    let body = {
      'quota': 5
    }
    return this.http.patch(urlTemp, body).pipe(
      tap((res) => {
        this.quota = res
        console.log('Quota: ', this.quota)
      })
    )
  }
  
}
