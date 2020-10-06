import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './products.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // URL
  public urlProducts: string = environment.baseUrl + 'v1/products/'
  public urlServices: string = environment.baseUrl + 'v1/services/'

  // Data
  public product: Product
  public products: Product[] = []
  public productsFiltered: Product[] = []
  public pdfProduct: any
  public productDocument: any
  public productImage: any
  public productList: any

  public cart: boolean = false

  constructor(
    private http: HttpClient
  ) { }

  search(body: Form): Observable<any> {
    return  this.http.post<any>(this.urlProducts, body).pipe(
      tap((res) => {
        this.product = res
        console.log('Product: ', this.product)
      })
    )
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlProducts).pipe(
      tap((res) => {
        this.products = res
        console.log('Products: ', this.products);
      })
    );
  }

  getOne(id: string): Observable<Product> {
    let urlTemp = this.urlProducts + id + '/';
    return this.http.get<Product>(urlTemp).pipe(
      tap((res) => {
        this.product = res
        console.log('Product: ', this.product);
      })
    );
  }

  check(body: any): Observable<any> {
    let urlTemp = this.urlProducts + 'check_availability/'
    console.log('hmmmm')
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        this.product = res
        console.log('Available: ', this.product);
      })
    );
  }

  generateDocument(body: any): Observable<any> {
    let urlTemp = this.urlProducts + 'generate_product/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        this.productDocument = res
        console.log(this.productDocument)
      })
    )
  }

  generateEgovData(body: any): Observable<any> {
    let urlTemp = this.urlProducts + 'generate_product/'
    return this.http.post(urlTemp, body).pipe(
      tap((res) => {
        console.log(res)
      })
    )
  }  

  generateImage(body: any): Observable<any> {
    let urlTemp = this.urlProducts + 'generate_image/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        this.productImage = res
        console.log(this.productImage)
      })
    )
  }

  generateList(body: any): Observable<any> {
    let urlTemp = this.urlProducts + 'generate_list/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        this.productList = res
        console.log(this.productList)
      })
    )
  }
  
}
