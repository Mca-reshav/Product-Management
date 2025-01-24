import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  dialogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.dialogForm.valid) {
      const formData = this.dialogForm.value;

      this.userService
        .toggleRole(formData)
        .pipe(
          tap((response) => {
            this.dialogRef.close(response);
          }),
          catchError((error) => {
            console.error('Error updating role:', error);
            this.dialogRef.close();
            return of(null);
          })
        )
        .subscribe();
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
