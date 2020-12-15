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

  // eGov investigations request to add 
  public requestToAdd: any[] = []

  // Investigation form 
  public investigationForm: any
  public investigationFileSizeGov = null
  public investigationFileNameGov = null
  public investigationFileSizeReq = null
  public investigationFileNameReq = null

  constructor(
    private http: HttpClient
  ) { }

  // Request service; ie. CBID
  requestService(body: Form): Observable<Request> {
    let urlTemp = this.urlServices + 'request/'
    return this.http.post<Request>(urlTemp, body).pipe(
      tap((res) => {
        this.request = res
        // console.log('Requested: ', this.service)
      })
    )
  }

  // Get available services
  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.urlServices).pipe(
      tap((res) => {
        this.services = res
        // console.log('Services: ', this.services);
      })
    );
  }

  submitRenewAcc(body): Observable<any> {  
    return this.http.post(this.urlEgovRequest+"add_request/",body).pipe(
    tap((res) => {
      // console.log('EGov requests: ', res)
    })
  )
}

  // Get particular service
  getOne(id: string): Observable<Service> {
    let urlTemp = this.urlServices + id + '/'
    return this.http.get<Service>(urlTemp).pipe(
      tap((res) => {
        this.service = res
        // console.log('Service: ', this.service);
      })
    );
  }

  // Filter services
  filter(field: string): Observable<Service[]> {
    let urlTemp = this.urlServices + '?' + field
    return this.http.get<Service[]>(urlTemp).pipe(
      tap((res) => {
        this.servicesFiltered = res
        // console.log('Filtered', this.servicesFiltered);
      })
    );
  }

  // Create new document request
  createDocumentRequest(body: any): Observable<Request> {
    let urlTemp = this.urlDocumentRequest + 'create_request/'
    return this.http.post<Request>(urlTemp, body).pipe(
      tap((res) => {
        // this.request = res
        // console.log('Requested: ', this.service)
      })
    )
  }

  // Add item to document request
  addDocumentRequestItem(id: string, body: any) {
    let urlTemp = this.urlDocumentRequest + id + '/add_item_to_document_request/'
    return this.http.post<Request>(urlTemp, body).pipe(
      tap((res) => {
        // this.request = res
        // console.log('Requested: ', this.service)
      })
    )
  }

  // Get user requests - descending create date
  getSelfRequest(body: any): Observable<any[]> {
    let urlTemp = this.urlDocumentRequest + 'user_request/?ordering=-created_date'
    return this.http.post<any[]>(urlTemp, body).pipe(
      tap((res) => {
        // this.services = res
        // console.log('Request: ', res);
      })
    );
  }

  // Create eGov request
  requestEgov(body: any): Observable<any[]> {
    let urlTemp = this.urlEgovRequest + 'add_request/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        // this.request = res
        // console.log('Requested: ', res)
      })
    )
  }

  // Read all eGov ministries
  getEgovMinistries(): Observable<any[]> {
    return this.http.get<any>(this.urlEgovMinistry).pipe(
      tap((res) => {
        // console.log('Ministry: ', res)
      })
    )
  }

  // Read all eGov departments
  getEgovDepartments(): Observable<any[]> {
    let urlTemp = this.urlEgovDepartment + 'extended/'
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        // console.log('Department: ', res)
      })
    )
  }
  
}
