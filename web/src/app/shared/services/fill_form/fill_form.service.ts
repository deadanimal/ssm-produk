import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { FillForm } from "./fill_form.model";

@Injectable({
  providedIn: "root",
})
export class FillFormsService {
  // URL
  public urlFillForm: string = environment.baseUrl + "v1/FillForms/";

  // Data
  public FillForm: FillForm;
  public FillForms: FillForm[] = [];
  public FillFormsFiltered: FillForm[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<FillForm> {
    return this.http.post<any>(this.urlFillForm, body).pipe(
      tap((res) => {
        console.log("FillForm: ", res);
      })
    );
  }

  getAll(): Observable<FillForm[]> {
    return this.http.get<FillForm[]>(this.urlFillForm).pipe(
      tap((res) => {
        console.log("FillForms: ", res);
      })
    );
  }

  getOne(id: String): Observable<FillForm> {
    let urlFillFormOne = this.urlFillForm + id + "/";
    return this.http.get<FillForm>(urlFillFormOne).pipe(
      tap((res) => {
        console.log("FillForm: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<FillForm> {
    let urlFillFormOne = this.urlFillForm + id + "/";
    return this.http.put<FillForm>(urlFillFormOne, body).pipe(
      tap((res) => {
        console.log("FillForm", res);
      })
    );
  }

  filter(field: String): Observable<FillForm[]> {
    let urlFilter = this.urlFillForm + "?" + field + "/";
    return this.http.get<FillForm[]>(urlFilter).pipe(
      tap((res) => {
        console.log("FillForms", res);
      })
    );
  }
}
