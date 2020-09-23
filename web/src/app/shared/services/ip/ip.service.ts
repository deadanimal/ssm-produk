import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Ip } from './ip.model';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  // URL
  public urlIp: string = ''

  // Data
  public ip: Ip

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Ip> {
    return this.http.get<Ip>(this.urlIp).pipe(
      tap((res: Ip) => {
        this.ip = res
        console.log('Client IP: ', this.ip)
      })
    )
  }

}
