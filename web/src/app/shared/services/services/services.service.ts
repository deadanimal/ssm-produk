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

  // Data
  public service: Service
  public services: Service[] = []
  public servicesFiltered: Service[] = []
  public servicesQuery: Service[] = []

  public request: Request

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
    return this.http.post<Service>(urlTemp, body).pipe(
      tap((res) => {
        this.service = res
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
}
