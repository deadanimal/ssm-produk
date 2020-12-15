import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiezService {

  constructor() { }

  getCookie(title: string) {
    return window.localStorage[title]
  }

  saveCookie(title: string, item: string) {
    window.localStorage[title] = item
  }

  destroyCookie() {
    window.localStorage.clear()
  }

}
