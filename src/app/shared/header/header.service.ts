import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private headerVisible = new BehaviorSubject<boolean>(false);
  headerVisible$ = this.headerVisible.asObservable();

  showHeader(): void {
    this.headerVisible.next(true);
  }

  hideHeader(): void {
    this.headerVisible.next(false);
  }
}
