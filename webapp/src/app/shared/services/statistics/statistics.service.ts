import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  // URL
  public urlStatistics: string = environment.baseUrl + 'v1/freeforms/';

  // Data
  public stat
  public stats: []

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    let url = this.urlStatistics;
    return this.http.get<any[]>(url).pipe(
      tap((res) => {
        console.log('Stats: ', res);
      })
    );    
  }

  patch(id: string, body: any): Observable<any> {
    let urlTemp = this.urlStatistics + id + '/'
    return this.http.patch<any>(urlTemp, body).pipe(
      tap((res) => {
        console.log('Patched: ', res)
      })
    )
  }
}
