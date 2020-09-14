import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './products.model';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // URL
  public urlProduct: string = environment.baseUrl + 'v1/products/services/'
  public urlPDF: string = environment.baseUrl + 'v1/products/create_product/'

  // Data
  public product: any
  public products: any[] = []
  public productsFiltered: any[] = []
  public pdfProduct: any


  public cart: boolean = false

  constructor(
    private http: HttpClient
  ) { }

  search(body: Form): Observable<any> {
    return  this.http.post<any>(this.urlProduct, body).pipe(
      tap((res) => {
        this.product = res
        console.log('Product: ', this.product)
      })
    )
  }

  getPDF(body: any): Observable<any> {
    return this.http.post<any>(this.urlPDF, body).pipe(
      tap((res) => {
        this.pdfProduct = res
        console.log(this.pdfProduct)
      })
    )
  }
  
}
