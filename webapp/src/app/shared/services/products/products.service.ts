import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './products.model';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  // URL
  public urlProducts: string = environment.baseUrl + 'v1/products/';

  // Data
  public product: Product
  public products: Product[]

  constructor(
    private http: HttpClient
  ) {}

  create(body: any): Observable<Product> {
    return this.http.post<Product>(this.urlProducts, body).pipe(
      tap((res) => {
        this.product = res
        console.log('Product: ', this.product)
      })
    )
  }

  getAll(): Observable<Product[]> {
    // let url = this.urlProducts;
    return this.http.get<Product[]>(this.urlProducts).pipe(
      tap((res) => {
        this.products = res
        console.log('Products: ', this.products);
      })
    );    
  }

  get(id: string): Observable<Product> {
    let urlTemp = this.urlProducts + id + '/'
    return this.http.get<Product>(urlTemp).pipe(
      tap((res) => {
        this.product = res
        console.log('Product: ', this.product)
      })
    )
  }

  patch(id: string, body: any): Observable<Product> {
    let urlTemp = this.urlProducts + id + '/'
    return this.http.patch<Product>(urlTemp, body).pipe(
      tap((res) => {
        this.product = res
        console.log('Patched: ', this.product)
      })
    )
  }

}
