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
  public urlDocumentRequest: string = environment.baseUrl + 'v1/document-requests/'
  public urlEgovRequest: string = environment.baseUrl + 'v1/egovernment-requests/'
  public urlEgovMinistry: string = environment.baseUrl + 'v1/egovernment-ministries/'
  public urlEgovDepartment: string = environment.baseUrl + 'v1/egovernment-departments/'
  
  // Data
  public requests: any[] = []

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    let tempUrl = this.servicesURL + '?ordering=-created_date'
    return this.http.get<any[]>(tempUrl).pipe(
      tap((res) => {
        this.requests = res
        // console.log('Service Requests: ', this.requests);
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
        // console.log('Service Request Report: ', res);
      })
    );        
  }

  patch(id: any, body: any): any {
    let urlTemp = this.servicesURL + id + '/';
    return this.http.patch(urlTemp, body).pipe(
      tap((res) => {
        // console.log('Patch: ', res);
      })
    );        
  }
  
  approveRequest(id: string, body: any) {
    let urlTemp = this.urlDocumentRequest + id + '/accept_request/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        // console.log('Approved:', res)
      })
    )
  }

  getEgovInvestigation(): Observable<any>  {
    let urlTemp = this.urlDocumentRequest + 'all_with_item/'
    return this.http.get(urlTemp).pipe(
      tap((res) => {
        // console.log('EGov investigations: ', res)
      })
    )
  }

  getEgovRequest(): Observable<any> {
    let urlTemp = this.urlEgovRequest + 'extended/'
    return this.http.get(urlTemp).pipe(
      tap((res) => {
        // console.log('EGov requests: ', res)
      })
    )
  }

  getEgovMinistries(): Observable<any[]> {
    return this.http.get<any>(this.urlEgovMinistry).pipe(
      tap((res) => {
        // console.log('Ministry: ', res)
      })
    )
  }

  getEgovDepartments(): Observable<any[]> {
    let urlTemp = this.urlEgovDepartment + 'extended/'
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        // console.log('Department: ', res)
      })
    )
  }

  patchDepartment(id: any, body: any): Observable<any[]> {
    let urlTemp = this.urlEgovDepartment + id + '/'
    return this.http.patch<any>(urlTemp, body).pipe(
      tap((res) => {
        // console.log('Patched: ', res)
      })
    )
  }

  patchMinistry(id: any, body: any): Observable<any[]> {
    let urlTemp = this.urlEgovMinistry + id + '/'
    return this.http.patch<any>(urlTemp, body).pipe(
      tap((res) => {
        // console.log('Patched: ', res)
      })
    )
  }

  createDepartment(body: any): Observable<any[]> {
    return this.http.post<any>(this.urlEgovDepartment, body).pipe(
      tap((res) => {
        
      })
    )
  }

  createMinistry(body: any): Observable<any[]> {
    return this.http.post<any>(this.urlEgovMinistry, body).pipe(
      tap((res) => {

      })
    )
  }

  approveEgovRegistration(id: any, body: any): Observable<any> {
    let urlTemp = this.urlEgovRequest + id + '/approve_user/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {

      })
    )
  }

  approveEgovRequest(id: string, body: any) {
    let urlTemp = this.urlEgovRequest + id + '/approve_request/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        // console.log('Approved:', res)
      })
    )
  }

  rejectEgovRegistration(id: any, body: any): Observable<any> {
    let urlTemp = this.urlEgovRequest + id + '/reject_user/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {

      })
    )
  }

  rejectEgovRequest(id: any, body: any): Observable<any> {
    let urlTemp = this.urlEgovRequest + id +'/reject_request/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {

      })
    )
  }

  approveDocReqItem(id: any, body: any): Observable<any> {
    let urlTemp = this.urlDocumentRequest + id +'/approve_item/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {

      })
    )
  }


  rejectDocReqItem(id: any, body: any): Observable<any> {
    let urlTemp = this.urlDocumentRequest + id +'/reject_item/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {

      })
    )
  }

}
