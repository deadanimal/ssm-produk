import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  // URL
  public urlProducts: string = environment.baseUrl + 'v1/products/';

  // Data
  public product
  public products: []

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    let url = this.urlProducts;
    return this.http.get<any[]>(url).pipe(
      tap((res) => {
        console.log('Products: ', res);
      })
    );    
  }

  patch(id: string, body: any): Observable<any> {
    let urlTemp = this.urlProducts + id + '/'
    return this.http.patch<any>(urlTemp, body).pipe(
      tap((res) => {
        console.log('Patched: ', res)
      })
    )
  }

}
