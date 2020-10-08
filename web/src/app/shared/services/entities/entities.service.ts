import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Entity } from './entities.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  // URL
  public urlEntities: string = environment.baseUrl + 'v1/entities/'

  // Data
  public entity: Entity
  public entities: Entity[] = []
  public entitiesFiltered: Entity[] = []
  public entitiesQuery: Entity[] = []

  constructor(
    private http: HttpClient
  ) { }

  query(field: string): Observable<Entity[]> {
    let urlTemp = this.urlEntities + 'search?name=' + field
    return this.http.get<Entity[]>(urlTemp).pipe(
      tap((res) => {
        this.entitiesQuery = res
        // console.log('Query: ', this.entitiesQuery)
      })
    )
  }

  getAll(): Observable<Entity[]> {
    return this.http.get<Entity[]>(this.urlEntities).pipe(
      tap((res) => {
        this.entities = res
        // console.log('Entities: ', this.entities);
      })
    );
  }

  getOne(id: string): Observable<Entity> {
    let urlTemp = this.urlEntities + id + '/'
    return this.http.get<Entity>(urlTemp).pipe(
      tap((res) => {
        this.entity = res
        // console.log('Entity: ', this.entity);
      })
    );
  }

  filter(field: string): Observable<Entity[]> {
    let urlTemp = this.urlEntities + '?' + field
    return this.http.get<Entity[]>(urlTemp).pipe(
      tap((res) => {
        this.entitiesFiltered = res
        // console.log('Filtered', this.entitiesFiltered);
      })
    );
  }


}
