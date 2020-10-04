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
export class ProductSearchCriteriaService {

   // URL
   public urlSearchCriteria: string = environment.baseUrl + 'v1/product_search_criterias/'

   // Data
   public criteria: any
   public criterias: any[] = []
   public criteriasFiltered: any[] = []
 
   constructor(
     private http: HttpClient
   ) { }

   create(body: any): Observable<any> {
    return this.http.post(this.urlSearchCriteria, body).pipe(
      tap((res) => {
        this.criteria = res
        console.log('Criteria: ', this.criteria)
      })
    )
  }
 
   get(id: string): Observable<any> {
     let urlTemp = this.urlSearchCriteria + id + '/'
     return this.http.get(urlTemp).pipe(
       tap((res) => {
         this.criteria = res
         console.log('Criteria: ', this.criteria)
       })
     )
   }
 
   update(id: string): Observable<any> {
     let urlTemp = this.urlSearchCriteria + id + '/'
     let body = {
       'criteria': this.criteria.criteria - 1
     }
     return this.http.patch(urlTemp, body).pipe(
       tap((res) => {
         this.criteria = res
         console.log('Criteria: ', this.criteria)
       })
     )
   }
 
   upgrade(id: string): Observable<any> {
     let urlTemp = this.urlSearchCriteria + id + '/'
     let body = {
       'criteria': 5
     }
     return this.http.patch(urlTemp, body).pipe(
       tap((res) => {
         this.criteria = res
         console.log('Criteria: ', this.criteria)
       })
     )
   }

}
