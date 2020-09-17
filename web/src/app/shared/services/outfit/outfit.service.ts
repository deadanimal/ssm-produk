import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Outfit } from "./outfit.model";

@Injectable({
  providedIn: "root",
})
export class OutfitsService {
  // URL
  public urlOutfit: string = environment.baseUrl + "v1/outfits/";

  // Data
  public Outfit: Outfit;
  public Outfits: Outfit[] = [];
  public OutfitsFiltered: Outfit[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Outfit> {
    return this.http.post<any>(this.urlOutfit, body).pipe(
      tap((res) => {
        console.log("Outfit: ", res);
      })
    );
  }

  getAll(): Observable<Outfit[]> {
    return this.http.get<Outfit[]>(this.urlOutfit).pipe(
      tap((res) => {
        console.log("Outfits: ", res);
      })
    );
  }

  getOne(id: String): Observable<Outfit> {
    let urlOutfitOne = this.urlOutfit + id + "/";
    return this.http.get<Outfit>(urlOutfitOne).pipe(
      tap((res) => {
        console.log("Outfit: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Outfit> {
    let urlOutfitOne = this.urlOutfit + id + "/";
    return this.http.put<Outfit>(urlOutfitOne, body).pipe(
      tap((res) => {
        console.log("Outfit", res);
      })
    );
  }

  filter(field: String): Observable<Outfit[]> {
    let urlFilter = this.urlOutfit + "?" + field + "/";
    return this.http.get<Outfit[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Outfits", res);
      })
    );
  }
}
