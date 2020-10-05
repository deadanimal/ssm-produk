import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // URL
  public urlUser: string = environment.baseUrl + 'v1/users/';

  // Data
  public user: User;
  public users: User[] = [];
  public usersFiltered: User[] = [];

  public currentUser: User;

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<User> {
    return this.http.post<any>(this.urlUser, body).pipe(
      tap((res) => {
        console.log('User: ', res);
      })
    );
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUser).pipe(
      tap((res) => {
        console.log('Users: ', res);
      })
    );
  }

  getOne(id: String): Observable<User> {
    let urlTemp = this.urlUser + id + '/';
    return this.http.get<User>(urlTemp).pipe(
      tap((res) => {
        this.currentUser = res
        console.log('User: ', res);
      })
    );
  }

  update(id: String, body: Form): Observable<User> {
    let urlTemp = this.urlUser + id + '/';
    console.log(body);
    return this.http.put<User>(urlTemp, body).pipe(
      tap((res) => {
        console.log('User', res);
      })
    );
  }

  filter(field: String): Observable<User[]> {
    let urlTemp = this.urlUser + '?' + field + '/';
    return this.http.get<User[]>(urlTemp).pipe(
      tap((res) => {
        console.log('Users', res);
      })
    );
  }

  addQuota(id: String): Observable<User> {
    let urlTemp = this.urlUser + id + '/add_egov_quota/';
    console.log('url --> ', urlTemp);
    return this.http.post<any>(urlTemp, id).pipe(
      tap(
        (res) => {
          console.log('User: ', res);
        },
        (err) => {
          console.log('User: ', err);
        }
      )
    );
  }
}
