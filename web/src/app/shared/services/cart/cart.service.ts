import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Cart } from "./cart.model";

@Injectable({
  providedIn: "root",
})
export class CartsService {
  // URL
  public urlCart: string = environment.baseUrl + "v1/cbid-carts/";

  // Data
  public Cart: Cart;
  public Carts: Cart[] = [];
  public CartsFiltered: Cart[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Cart> {
    return this.http.post<any>(this.urlCart, body).pipe(
      tap((res) => {
        console.log("Cart: ", res);
      })
    );
  }

  getAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.urlCart).pipe(
      tap((res) => {
        console.log("Carts: ", res);
      })
    );
  }

  getOne(id: String): Observable<Cart> {
    let urlCartOne = this.urlCart + id + "/";
    return this.http.get<Cart>(urlCartOne).pipe(
      tap((res) => {
        console.log("Cart: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Cart> {
    let urlCartOne = this.urlCart + id + "/";
    return this.http.put<Cart>(urlCartOne, body).pipe(
      tap((res) => {
        console.log("Cart", res);
      })
    );
  }

  filter(field: String): Observable<Cart[]> {
    let urlFilter = this.urlCart + "?" + field + "/";
    return this.http.get<Cart[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Carts", res);
      })
    );
  }

  delete(id: String): Observable<Cart[]> {
    let urlFilter = this.urlCart + id;
    return this.http.delete<Cart[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Carts", res);
      })
    );
  }
}
