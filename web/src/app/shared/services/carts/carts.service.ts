import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart, CartExtended, CartItem } from './carts.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  // URL
  public urlCarts: string = environment.baseUrl + 'v1/carts/'

  // Data
  public cart: any
  public carts: any[] = []
  public cartsFiltered: CartExtended[] = []
  public cartsQuery: any[] = []

  public cartPending: CartExtended

  public cartCurrent: any

  public cartTemp: CartItem[]

  constructor(
    private http: HttpClient,
    private userService: UsersService
  ) { }

  create(body: any): Observable<any> {
    return this.http.post<any>(this.urlCarts, body).pipe(
      tap((res) => {
        this.cartCurrent = res
        console.log('User: ', res);
      })
    );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.urlCarts).pipe(
      tap((res) => {
        this.carts = res
        console.log('Carts: ', this.carts);
      })
    );
  }

  getOne(id: string): Observable<CartExtended> {
    let urlTemp = this.urlCarts + id + '/with_item/'
    return this.http.get<CartExtended>(urlTemp).pipe(
      tap((res) => {
        this.cart = res
        console.log('Cart: ', this.cart);
      })
    );
  }

  getMany(): Observable<any> {
    let urlTemp = this.urlCarts + 'latest_successful/?user=' + this.userService.currentUser.id
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        // console.log(res)
        // this.cart = res
        console.log('Cart: ', this.cart);
      })
    );
  }  

  filter(field: string): Observable<CartExtended[]> {
    let urlTemp = this.urlCarts + '?' + field
    return this.http.get<any[]>(urlTemp).pipe(
      tap((res: CartExtended[]) => {
        if (res.length == 1) {
          this.cartPending = res[0]
          console.log('Cart: ', this.cartPending)
        }
        else if (res.length >= 2) {
          this.cartsFiltered = res
          console.log('Carts: ', this.cartsFiltered)
        }
      })
    );
  }

  addItem(id: string, body: Form): Observable<any> {
    let urlTemp = this.urlCarts + id + '/add_item_to_cart/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        this.cart = res
        console.log('Added', this.cart);
      })
    );
  }

  removeItem(id: string, body: any): Observable<any> {
    let urlTemp = this.urlCarts + id + '/remove_item_from_cart/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        this.cart = res
        console.log('Removed', this.cart);
      })
    );
  }

  updatePrice(id: string, body: any): Observable<any> {
    let urlTemp = this.urlCarts + id + '/'
    return this.http.patch<any>(urlTemp, body).pipe(
      tap((res) => {
        this.cart = res
        console.log('Carts: ', this.cart);
      })
    );
  }

}
