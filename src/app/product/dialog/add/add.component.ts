import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { productCategories, productRatings } from '../../../utils/constants.utils';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddProductComponent {
  productForm: FormGroup;
  productCategories = productCategories;
  productRatings = productRatings;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      brand: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: [this.productCategories[0], Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      rating: [this.productRatings[0], Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
