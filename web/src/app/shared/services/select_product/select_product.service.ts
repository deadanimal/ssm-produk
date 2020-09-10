import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { SelectProduct } from "./select_product.model";

@Injectable({
  providedIn: "root",
})
export class SelectProductsService {
  // URL
  public urlSelectProduct: string = environment.baseUrl + "v1/SelectProducts/";

  // Data
  public SelectProduct: SelectProduct;
  public SelectProducts: SelectProduct[] = [];
  public SelectProductsFiltered: SelectProduct[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<SelectProduct> {
    return this.http.post<any>(this.urlSelectProduct, body).pipe(
      tap((res) => {
        console.log("SelectProduct: ", res);
      })
    );
  }

  getAll(): Observable<SelectProduct[]> {
    return this.http.get<SelectProduct[]>(this.urlSelectProduct).pipe(
      tap((res) => {
        console.log("SelectProducts: ", res);
      })
    );
  }

  getOne(id: String): Observable<SelectProduct> {
    let urlSelectProductOne = this.urlSelectProduct + id + "/";
    return this.http.get<SelectProduct>(urlSelectProductOne).pipe(
      tap((res) => {
        console.log("SelectProduct: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<SelectProduct> {
    let urlSelectProductOne = this.urlSelectProduct + id + "/";
    return this.http.put<SelectProduct>(urlSelectProductOne, body).pipe(
      tap((res) => {
        console.log("SelectProduct", res);
      })
    );
  }

  filter(field: String): Observable<SelectProduct[]> {
    let urlFilter = this.urlSelectProduct + "?" + field + "/";
    return this.http.get<SelectProduct[]>(urlFilter).pipe(
      tap((res) => {
        console.log("SelectProducts", res);
      })
    );
  }
}
