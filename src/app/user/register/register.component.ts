import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../../services/toaster.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isUserAlreadyRegistered = true;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toaster: ToasterService,
    private router: Router,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      emailId: ['', [Validators.required, Validators.email]],
      contactNo: [
        '',
        [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService
        .registerUser(this.registerForm.value)
        .pipe(
          tap((response) => {
            if (response.success) {
              this.toaster.success(`${response.message}`);
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
            } else {
              this.toaster.error(response.message, 'Error');
            }
          }),
          catchError((err) => {
            this.toaster.error('Error on registration');
            console.error(err);
            return [];
          })
        )
        .subscribe();
    } else {
      this.toaster.error('Please fill all the fields', 'Error');
    }
  }
}
