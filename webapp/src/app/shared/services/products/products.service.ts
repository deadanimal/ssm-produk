import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class ProductsService {

  // URL
  public productsURL: string = environment.baseUrl + "v1/products/";

  constructor(private http: HttpClient) {}

  getAllProducts(): any {
    let url = this.productsURL;
    return this.http.get(url).pipe(
      tap((res) => {
        console.log("Products: ", res);
      })
    );    
  }

}
