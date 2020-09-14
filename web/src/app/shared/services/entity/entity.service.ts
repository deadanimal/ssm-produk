import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Entity } from "./entity.model";

@Injectable({
  providedIn: "root",
})
export class EntitysService {
  // URL
  public urlEntity: string = environment.baseUrl + "v1/cbid-tickets/";

  // Data
  public Entity: Entity;
  public Entitys: Entity[] = [];
  public EntitysFiltered: Entity[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Entity> {
    return this.http.post<any>(this.urlEntity, body).pipe(
      tap((res) => {
        console.log("Entity: ", res);
      })
    );
  }

  getAll(): Observable<Entity[]> {
    return this.http.get<Entity[]>(this.urlEntity).pipe(
      tap((res) => {
        console.log("Entitys: ", res);
      })
    );
  }

  getOne(id: String): Observable<Entity> {
    let urlEntityOne = this.urlEntity + id + "/";
    return this.http.get<Entity>(urlEntityOne).pipe(
      tap((res) => {
        console.log("Entity: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Entity> {
    let urlEntityOne = this.urlEntity + id + "/";
    return this.http.put<Entity>(urlEntityOne, body).pipe(
      tap((res) => {
        console.log("Entity", res);
      })
    );
  }

  filter(field: String): Observable<Entity[]> {
    let urlFilter = this.urlEntity + "?" + field + "/";
    return this.http.get<Entity[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Entitys", res);
      })
    );
  }

  delete(id: String): Observable<Entity[]> {
    let urlFilter = this.urlEntity + id;
    return this.http.delete<Entity[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Entitys", res);
      })
    );
  }
}
