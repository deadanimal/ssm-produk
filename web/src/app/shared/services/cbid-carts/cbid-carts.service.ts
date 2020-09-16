import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CbidCart } from "./cbid-carts.model";

@Injectable({
  providedIn: "root",
})
export class CbidCartsService {
  // URL
  public urlCbidCart: string = environment.baseUrl + "v1/cbid-carts/";

  // Data
  public CbidCart: CbidCart;
  public CbidCarts: CbidCart[] = [];
  public CbidCartsFiltered: CbidCart[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<CbidCart> {
    return this.http.post<any>(this.urlCbidCart, body).pipe(
      tap((res) => {
        console.log("CbidCart: ", res);
      })
    );
  }

  getAll(): Observable<CbidCart[]> {
    return this.http.get<CbidCart[]>(this.urlCbidCart).pipe(
      tap((res) => {
        console.log("CbidCarts: ", res);
      })
    );
  }

  getOne(id: String): Observable<CbidCart> {
    let urlCbidCartOne = this.urlCbidCart + id + "/";
    return this.http.get<CbidCart>(urlCbidCartOne).pipe(
      tap((res) => {
        console.log("CbidCart: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<CbidCart> {
    let urlCbidCartOne = this.urlCbidCart + id + "/";
    return this.http.put<CbidCart>(urlCbidCartOne, body).pipe(
      tap((res) => {
        console.log("CbidCart", res);
      })
    );
  }

  filter(field: String): Observable<CbidCart[]> {
    let urlFilter = this.urlCbidCart + "?" + field + "/";
    return this.http.get<CbidCart[]>(urlFilter).pipe(
      tap((res) => {
        console.log("CbidCarts", res);
      })
    );
  }

  delete(id: String): Observable<CbidCart[]> {
    let urlFilter = this.urlCbidCart + id;
    return this.http.delete<CbidCart[]>(urlFilter).pipe(
      tap((res) => {
        console.log("CbidCarts", res);
      })
    );
  }
}
