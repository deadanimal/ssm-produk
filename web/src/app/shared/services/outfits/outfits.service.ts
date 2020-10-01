import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Outfit } from './outfits.model';

@Injectable({
  providedIn: 'root'
})
export class OutfitsService {

  // URL
  public urlOutfits: string = environment.baseUrl + 'v1/outfits/';

  // Data
  public outfit: Outfit;
  public outfits: Outfit[] = [];
  public outfitsFiltered: Outfit[] = [];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Outfit[]> {
    return this.http.get<Outfit[]>(this.urlOutfits).pipe(
      tap((res) => {
        this.outfits = res
        console.log('Outfits: ', res);
      })
    );
  }

  getOne(id: String): Observable<Outfit> {
    let urlTemp = this.urlOutfits + id + '/';
    return this.http.get<Outfit>(urlTemp).pipe(
      tap((res) => {
        this.outfit = res
        console.log('Outfit: ', this.outfit);
      })
    );
  }

  filter(field: String): Observable<Outfit[]> {
    let urlTemp = this.urlOutfits + '?' + field + '/';
    return this.http.get<Outfit[]>(urlTemp).pipe(
      tap((res) => {
        this.outfitsFiltered = res
        console.log('Outfits filtered: ', this.outfitsFiltered);
      })
    );
  }

}
