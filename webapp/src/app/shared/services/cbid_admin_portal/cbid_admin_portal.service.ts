import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CbidAdminPortal } from "./cbid_admin_portal.model";

@Injectable({
  providedIn: "root",
})
export class CbidAdminPortalsService {
  // URL
  public urlCbidAdminPortal: string =
    environment.baseUrl + "v1/CbidAdminPortals/";

  // Data
  public CbidAdminPortal: CbidAdminPortal;
  public CbidAdminPortals: CbidAdminPortal[] = [];
  public CbidAdminPortalsFiltered: CbidAdminPortal[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<CbidAdminPortal> {
    return this.http.post<any>(this.urlCbidAdminPortal, body).pipe(
      tap((res) => {
        console.log("CbidAdminPortal: ", res);
      })
    );
  }

  getAll(): Observable<CbidAdminPortal[]> {
    return this.http.get<CbidAdminPortal[]>(this.urlCbidAdminPortal).pipe(
      tap((res) => {
        console.log("CbidAdminPortals: ", res);
      })
    );
  }

  getOne(id: String): Observable<CbidAdminPortal> {
    let urlCbidAdminPortalOne = this.urlCbidAdminPortal + id + "/";
    return this.http.get<CbidAdminPortal>(urlCbidAdminPortalOne).pipe(
      tap((res) => {
        console.log("CbidAdminPortal: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<CbidAdminPortal> {
    let urlCbidAdminPortalOne = this.urlCbidAdminPortal + id + "/";
    return this.http.put<CbidAdminPortal>(urlCbidAdminPortalOne, body).pipe(
      tap((res) => {
        console.log("CbidAdminPortal", res);
      })
    );
  }

  filter(field: String): Observable<CbidAdminPortal[]> {
    let urlFilter = this.urlCbidAdminPortal + "?" + field + "/";
    return this.http.get<CbidAdminPortal[]>(urlFilter).pipe(
      tap((res) => {
        console.log("CbidAdminPortals", res);
      })
    );
  }
}
