import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LocalFilesService {

  // URL
  public urlLocal: string = 'assets/json/';

  // Data
  public datas: any = []

  constructor(
    private http: HttpClient
  ) { }

  get(path: string): Observable<any> {
    let urlPath = this.urlLocal + path
    return this.http.get<any>(urlPath).pipe(
      tap((res) => {
        this.datas = res
        // console.log('Data: ', this.datas)
      })
    )
  }

}
