import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Request, Service } from './services.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  // URL
  public urlServices: string = environment.baseUrl + 'v1/services/'
  public urlDocumentRequest: string = environment.baseUrl + 'v1/document-requests/'
  public urlEgovRequest: string = environment.baseUrl + 'v1/egovernment-requests/'
  public urlEgovMinistry: string = environment.baseUrl + 'v1/egovernment-ministries/'
  public urlEgovDepartment: string = environment.baseUrl + 'v1/egovernment-departments/'

  // Data
  public service: Service
  public services: Service[] = []
  public servicesFiltered: Service[] = []
  public servicesQuery: Service[] = []

  public request: Request

  public requestToAdd: any[] = []

  constructor(
    private http: HttpClient
  ) { }

  query(field: string): Observable<Service[]> {
    let urlTemp = this.urlServices + 'search?name=' + field
    return this.http.get<Service[]>(urlTemp).pipe(
      tap((res) => {
        this.servicesQuery = res
        console.log('Query: ', this.servicesQuery)
      })
    )
  }

  create(body: Form): Observable<Service> {
    return this.http.post<Service>(this.urlServices, body).pipe(
      tap((res) => {
        this.service = res
        console.log('Created: ', this.service)
      })
    )
  }

  requestService(body: Form): Observable<Request> {
    let urlTemp = this.urlServices + 'request/'
    return this.http.post<Request>(urlTemp, body).pipe(
      tap((res) => {
        this.request = res
        console.log('Requested: ', this.service)
      })
    )
  }

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.urlServices).pipe(
      tap((res) => {
        this.services = res
        console.log('Services: ', this.services);
      })
    );
  }

  getOne(id: string): Observable<Service> {
    let urlTemp = this.urlServices + id + '/'
    return this.http.get<Service>(urlTemp).pipe(
      tap((res) => {
        this.service = res
        console.log('Service: ', this.service);
      })
    );
  }

  filter(field: string): Observable<Service[]> {
    let urlTemp = this.urlServices + '?' + field
    return this.http.get<Service[]>(urlTemp).pipe(
      tap((res) => {
        this.servicesFiltered = res
        console.log('Filtered', this.servicesFiltered);
      })
    );
  }

  createDocumentRequest(body: any): Observable<Request> {
    let urlTemp = this.urlDocumentRequest
    return this.http.post<Request>(urlTemp, body).pipe(
      tap((res) => {
        // this.request = res
        console.log('Requested: ', this.service)
      })
    )
  }

  addDocumentRequestItem(id: string, body: any) {
    let urlTemp = this.urlDocumentRequest + id + '/add_item_to_document_request/'
    return this.http.post<Request>(urlTemp, body).pipe(
      tap((res) => {
        // this.request = res
        console.log('Requested: ', this.service)
      })
    )
  }

  getSelfRequest(body: any): Observable<any[]> {
    let urlTemp = this.urlDocumentRequest + 'user_request/'
    return this.http.post<any[]>(urlTemp, body).pipe(
      tap((res) => {
        // this.services = res
        console.log('Request: ', res);
      })
    );
  }

  requestEgov(body: any): Observable<any[]> {
    return this.http.post<any>(this.urlEgovRequest, body).pipe(
      tap((res) => {
        // this.request = res
        // console.log('Requested: ', res)
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
        console.log('Patched: ', res)
      })
    )
  }

  createDepartment(body: any): Observable<any[]> {
    return this.http.post<any>(this.urlEgovMinistry, body).pipe(
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

  requestQuota(): Observable<any[]> {
    return this.http.get<any>(this.urlEgovRequest).pipe(
      tap((res) => {
        // this.request = res
        // console.log('Requested: ', res)
      })
    )
  }

  requestChange(): Observable<any> {
    return this.http.get(this.urlEgovDepartment).pipe(
      tap((res) => {
        //
      })
    )
  }

  
}
