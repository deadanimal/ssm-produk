import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { CbidCart } from './cbid-carts.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  
  // URL
  public servicesURL: string = environment.baseUrl + 'v1/service-requests/';

  // Data
  public requests: any[] = []

  constructor(private http: HttpClient) {}



  getAll(): Observable<any[]> {
    let tempUrl = this.servicesURL + '?ordering=-created_date'
    return this.http.get<any[]>(tempUrl).pipe(
      tap((res) => {
        this.requests = res
        console.log('Service Requests: ', this.requests);
      })
    );    
  }

  markAsCompleteServiceRequest(id: String, body: any): any {
    let url = this.servicesURL + id + '/mark_as_complete/';
    return this.http.post(url, body).pipe(
      tap((res) => {
        
      })
    );
  }

  getReport(): any {
    let url = this.servicesURL + 'report/';
    return this.http.get(url).pipe(
      tap((res) => {
        console.log('Service Request Report: ', res);
      })
    );        
  }

  patch(id: any, body: any): any {
    let urlTemp = this.servicesURL + id + '/';
    return this.http.patch(urlTemp, body).pipe(
      tap((res) => {
        console.log('Patch: ', res);
      })
    );        
  }
  /*
  create(body: Form): Observable<CbidCart> {
    return this.http.post<any>(this.urlCbidCart, body).pipe(
      tap((res) => {
        console.log('CbidCart: ', res);
      })
    );
  }

  getAll(): Observable<CbidCart[]> {
    return this.http.get<CbidCart[]>(this.urlCbidCart).pipe(
      tap((res) => {
        console.log('CbidCarts: ', res);
      })
    );
  }

  getOne(id: String): Observable<CbidCart> {
    let urlCbidCartOne = this.urlCbidCart + id + '/';
    return this.http.get<CbidCart>(urlCbidCartOne).pipe(
      tap((res) => {
        console.log('CbidCart: ', res);
      })
    );
  }

  update(id: String, body: Form): Observable<CbidCart> {
    let urlCbidCartOne = this.urlCbidCart + id + '/';
    return this.http.put<CbidCart>(urlCbidCartOne, body).pipe(
      tap((res) => {
        console.log('CbidCart', res);
      })
    );
  }

  filter(field: String): Observable<CbidCart[]> {
    let urlFilter = this.urlCbidCart + '?' + field + '/';
    return this.http.get<CbidCart[]>(urlFilter).pipe(
      tap((res) => {
        console.log('CbidCarts', res);
      })
    );
  }

  delete(id: String): Observable<CbidCart[]> {
    let urlFilter = this.urlCbidCart + id;
    return this.http.delete<CbidCart[]>(urlFilter).pipe(
      tap((res) => {
        console.log('CbidCarts', res);
      })
    );
  }
  */
}
