import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../../core/global.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private global: GlobalService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isLogged();
  }

  isLogged(): boolean {
    let isLogged: boolean;
    isLogged = this.global.getIsLogged();
    if (isLogged)
      return true;
    this.router.navigate(['/login']);
    return false;

  }
}
