import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storeService: StoreService, private router: Router) {}

  canActivate(): boolean {
    const token = this.storeService.get('token');

    if (token) return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
