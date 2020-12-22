import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ForecastRevenue } from './forecast-revenue.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastRevenueService {

  // URL
  public urlForecastrevenues: string = environment.baseUrl + 'v1/forecast_revenue/';

  // Data
  public forecastrevenue: ForecastRevenue
  public forecastrevenues: ForecastRevenue[]

  constructor(
    private http: HttpClient
  ) { }

  create(body: any): Observable<ForecastRevenue> {
    console.log(body)
    return this.http.post<ForecastRevenue>(this.urlForecastrevenues, body).pipe(
      tap((res) => {
        this.forecastrevenue = res
        console.log('Porecastrevenue: ', this.forecastrevenue)
      })
    )
  }

  getAll(): Observable<ForecastRevenue[]> {
    // let url = this.urlPorecastrevenues;
    return this.http.get<ForecastRevenue[]>(this.urlForecastrevenues).pipe(
      tap((res) => {
        this.forecastrevenues = res
        console.log('Porecastrevenues: ', this.forecastrevenues);
      })
    );
  }

  get(id: string): Observable<ForecastRevenue> {
    let urlTemp = this.urlForecastrevenues + id + '/'
    return this.http.get<ForecastRevenue>(urlTemp).pipe(
      tap((res) => {
        this.forecastrevenue = res
        console.log('Porecastrevenue: ', this.forecastrevenue)
      })
    )
  }

  patch(id: string, body: any): Observable<ForecastRevenue> {
    let urlTemp = this.urlForecastrevenues + id + '/'
    return this.http.patch<ForecastRevenue>(urlTemp, body).pipe(
      tap((res) => {
        this.forecastrevenue = res
        console.log('Porecastrevenue: ', this.forecastrevenue)
      })
    )
  }
}
