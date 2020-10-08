import { Injectable } from '@angular/core';
import { 
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate, 
  Router
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute
  ){ }
  
  canActivate(route: ActivatedRouteSnapshot){
    let urlPath = route['_routerState']['url'].split('?')[0]
    // console.log('split', urlPath.split('?')[0])
    if (this.userService.currentUser) {
      return true
    }
    else if (urlPath == '/payment/return') {
      return true
    }
    else {
      return this.navigatePage('/not-authorized')
    }
  }

  navigatePage(path: string) {
    return this.router.navigate([path])
  }
  
}
