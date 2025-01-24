import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ToasterService } from '../../services/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { UserService } from '../user.service';
import { ProfileResponse } from '../user.model';
import { roles } from '../../utils/constants.utils';
import { HeaderService } from '../../shared/header/header.service';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  data: any = {};
  usersList: any[] = [];

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private toaster: ToasterService,
    public dialog: MatDialog,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.showHeader();

    this.headerService.headerVisible$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((visible) => {});

    this.fetchUserProfile();
    this.fetchUsersList();
  }

  fetchUserProfile(): void {
    this.userService
      .showProfile()
      .pipe(
        tap((response: ProfileResponse) => {
          this.data = response.data;
        }),
        catchError((error) => {
          this.toaster.error('Failed to fetch profile', 'Error');
          console.error('Error fetching profile:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  fetchUsersList(): void {
    if (this.storeService.get('role') == roles.ADMIN) {
      this.userService
      .getAllUsers()
      .pipe(
        tap((response) => {
          this.usersList = response.data || [];
        }),
        catchError((error) => {
          this.toaster.error('Failed to fetch users list', 'Error');
          return of(null);
        })
      )
      .subscribe();
    }
  }

  toggleRole(): void {
    const role = this.storeService.get('role');
    if (role == roles.ADMIN) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px',
        data: {},
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result.success) {
          this.toaster.success(result.message);
          this.fetchUserProfile();
          this.fetchUsersList();
        } else this.toaster.error(result.message);
      });
    } else {
      this.toaster.error('Admin permission required');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
