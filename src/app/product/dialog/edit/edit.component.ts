import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { productCategories, productRatings } from '../../../utils/constants.utils';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProductComponent {
  productForm: FormGroup;
  productCategories = productCategories;
  productRatings = productRatings;
  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      id: [data.id],
      brand: [data.brand, Validators.required],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      price: [data.price, [Validators.required, Validators.min(0)]],
      category: [data.category, Validators.required],
      stock: [data.stock, [Validators.required, Validators.min(0)]],
      rating: [data.rating, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value); 
    } else {
      console.error('Form is invalid');
    }
  }

}
