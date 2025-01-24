import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private storeService: StoreService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    const getConsent = confirm('Are you sure you want to log out?');
    if (getConsent) {
      this.headerService.hideHeader();
      this.storeService.clearAll();
      this.router.navigate(['/login']);
    }
  }
}
