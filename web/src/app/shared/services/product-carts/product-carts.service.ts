import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ProductCart } from "./product-carts.model";
@Injectable({
  providedIn: 'root'
})
export class ProductCartsService {

  // URL
  public urlProductCart: string = environment.baseUrl + "v1/product-carts/";

  // Data
  public ProductCart: ProductCart;
  public ProductCarts: ProductCart[] = [];
  public ProductCartsFiltered: ProductCart[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<ProductCart> {
    return this.http.post<any>(this.urlProductCart, body).pipe(
      tap((res) => {
        console.log("ProductCart: ", res);
      })
    );
  }

  getAll(): Observable<ProductCart[]> {
    return this.http.get<ProductCart[]>(this.urlProductCart).pipe(
      tap((res) => {
        this.ProductCarts = res
        console.log("ProductCarts: ", res);
      })
    );
  }

  getOne(id: String): Observable<ProductCart> {
    let urlProductCartOne = this.urlProductCart + id + "/";
    return this.http.get<ProductCart>(urlProductCartOne).pipe(
      tap((res) => {
        console.log("ProductCart: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<ProductCart> {
    let urlProductCartOne = this.urlProductCart + id + "/";
    return this.http.put<ProductCart>(urlProductCartOne, body).pipe(
      tap((res) => {
        console.log("ProductCart", res);
      })
    );
  }

  filter(field: String): Observable<ProductCart[]> {
    let urlFilter = this.urlProductCart + "?" + field + "/";
    return this.http.get<ProductCart[]>(urlFilter).pipe(
      tap((res) => {
        console.log("ProductCarts", res);
      })
    );
  }

  delete(id: String): Observable<ProductCart[]> {
    let urlFilter = this.urlProductCart + id;
    return this.http.delete<ProductCart[]>(urlFilter).pipe(
      tap((res) => {
        console.log("ProductCarts", res);
      })
    );
  }

}
