import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { StoreService } from '../../services/store.service';
import { HeaderService } from '../../shared/header/header.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  isUserRegistered = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toaster: ToasterService,
    private router: Router,
    private userService: UserService,
    private storeService: StoreService,
    private headerService: HeaderService
  ) {

    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    const isToken = this.storeService.get('token');
    if (isToken) this.router.navigate(['/profile'])
  }

 onSubmit(): void {
  if (this.loginForm.valid) {
    this.userService.loginUser(this.loginForm.value)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.headerService.showHeader();
            this.toaster.success('Login successful', 'Success');
            this.router.navigate(['/profile']);
            this.storeService.clearAll();
            this.storeService.set('token', response.data.token);
            this.storeService.set('userId', response.data.userId);
            this.storeService.set('role', response.data.role);
          } else this.toaster.error(response.message, 'Error');
        }),
        catchError((err) => {
          this.toaster.error('Error on login', 'Error');
          console.error(err);
          return of(null);
        })
      )
      .subscribe();
  } else {
    this.toaster.error('Please fill all the fields', 'Error');
  }
}

}
