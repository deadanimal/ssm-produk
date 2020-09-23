import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Outfit } from "./outfits.model";

@Injectable({
  providedIn: 'root'
})
export class OutfitsService {

  // URL
  public urlOutfits: string = environment.baseUrl + "v1/outfits/";

  // Data
  public outfit: Outfit;
  public outfits: Outfit[] = [];
  public outfitsFiltered: Outfit[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Outfit> {
    return this.http.post<any>(this.urlOutfits, body).pipe(
      tap((res) => {
        console.log("Outfit: ", res);
      })
    );
  }

  getAll(): Observable<Outfit[]> {
    return this.http.get<Outfit[]>(this.urlOutfits).pipe(
      tap((res) => {
        this.outfits = res
        console.log("Outfits: ", res);
      })
    );
  }

  getOne(id: String): Observable<Outfit> {
    let urlTemp = this.urlOutfits + id + "/";
    return this.http.get<Outfit>(urlTemp).pipe(
      tap((res) => {
        console.log("Outfit: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Outfit> {
    let urlTemp = this.urlOutfits + id + "/";
    return this.http.put<Outfit>(urlTemp, body).pipe(
      tap((res) => {
        console.log("Outfit", res);
      })
    );
  }

  filter(field: String): Observable<Outfit[]> {
    let urlFilter = this.urlOutfits + "?" + field + "/";
    return this.http.get<Outfit[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Outfits", res);
      })
    );
  }

}
