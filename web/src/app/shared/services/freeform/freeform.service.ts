import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Freeform } from "./freeform.model";

@Injectable({
  providedIn: "root",
})
export class FreeformsService {
  // URL
  public urlFreeform: string = environment.baseUrl + "v1/freeforms/";

  // Data
  public Freeform: Freeform;
  public Freeforms: Freeform[] = [];
  public FreeformsFiltered: Freeform[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Freeform> {
    return this.http.post<any>(this.urlFreeform, body).pipe(
      tap((res) => {
        console.log("Freeform: ", res);
      })
    );
  }

  getAll(): Observable<Freeform[]> {
    return this.http.get<Freeform[]>(this.urlFreeform).pipe(
      tap((res) => {
        console.log("Freeforms: ", res);
      })
    );
  }

  getOne(id: String): Observable<Freeform> {
    let urlFreeformOne = this.urlFreeform + id + "/";
    return this.http.get<Freeform>(urlFreeformOne).pipe(
      tap((res) => {
        console.log("Freeform: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Freeform> {
    let urlFreeformOne = this.urlFreeform + id + "/";
    return this.http.put<Freeform>(urlFreeformOne, body).pipe(
      tap((res) => {
        console.log("Freeform", res);
      })
    );
  }

  filter(field: String): Observable<Freeform[]> {
    let urlFilter = this.urlFreeform + "?" + field + "/";
    return this.http.get<Freeform[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Freeforms", res);
      })
    );
  }
}
