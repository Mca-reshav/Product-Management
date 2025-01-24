import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { ToasterService } from '../services/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private storeService: StoreService,
    private toasterService: ToasterService
  ) {}

  tokenExpired(): boolean {
    this.storeService.clearAll();
    this.toasterService.info('Your session has expired');
    this.router.navigate(['/login']);
    return true;
  }
}
