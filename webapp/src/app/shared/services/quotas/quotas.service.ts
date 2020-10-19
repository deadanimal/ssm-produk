import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotasService {

  // URL
  public urlQuota: string = environment.baseUrl + 'v1/quotas/';

  // Data
  public quota: any
  public quotas: any[] = []

  constructor(
    private http: HttpClient
  ) {}

  getEgov() {
    let urlTemp = this.urlQuota + 'extended_egov/'
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        console.log('EGov quotas: ', res)
      })
    )
  }

}
