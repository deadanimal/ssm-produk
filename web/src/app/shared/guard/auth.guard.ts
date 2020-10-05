import { Injectable } from '@angular/core';
import { 
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
    private userService: UsersService
  ){ }
  
  canActivate(route: ActivatedRouteSnapshot){
    const expectedRole = route.data.role
    if (this.userService.currentUser) {
      return true
    }
    else {
      return this.router.navigate(['/home'])
    }
  }
  
}
