import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../product.service';
import { HeaderService } from '../../shared/header/header.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../dialog/add/add.component';
import { ToasterService } from '../../services/toaster.service';
import { AddProductRequest } from '../product.model';
import { EditProductComponent } from '../dialog/edit/edit.component';
import { DeleteProductComponent } from '../dialog/delete/delete.component';
import { StoreService } from '../../services/store.service';
import { productCategoriesIcon } from '../../utils/constants.utils';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    'serialNo',
    'image',
    'name',
    'brand',
    'description',
    'price',
    'category',
    'stock',
    'rating',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  totalRecords = 0;
  pageSize = 10;
  searchQuery = '';
  isAdmin = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private productService: ProductService,
    private headerService: HeaderService,
    private toaster: ToasterService,
    private storeService: StoreService,
    private dialog: MatDialog
  ) {}

  categoryIcons: { [key: number]: string } = productCategoriesIcon;

  ngOnInit(): void {
    this.headerService.showHeader();
    const role = this.storeService.get('role');
    this.isAdmin = role == 1;
    this.fetchProducts();
  }
  starsArray(rating: number): number[] {
    return new Array(5).fill(0).map((_, index) => index);
  }
  fetchProducts(
    page: number = 0,
    limit: number = this.pageSize,
    search: string = ''
  ): void {
    const sortField = this.sort?.active || 'name';
    const sortOrder = this.sort?.direction || 'asc';
    const data = { page, limit, search, sortField, sortOrder };
    this.productService.getProducts(data).subscribe((response: any) => {
      this.dataSource.data = response.data.data;
      this.totalRecords = response.data.totalRecords;
    });
  }

  getCategoryIcon(categoryKey: number): string {
    return this.categoryIcons[categoryKey] || 'help_outline';
  }

  applySearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.trim();
    this.searchQuery = searchValue;
    this.fetchProducts(0, this.pageSize, this.searchQuery);
  }

  refreshTable(): void {
    this.fetchProducts();
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addProduct(result);
      }
    });
  }

  addProduct(productData: AddProductRequest): void {
    this.productService
      .addProduct(productData)
      .pipe(
        tap((response: any) => {
          if (response.success) {
            this.fetchProducts();
            this.toaster.success(`${response.message}`);
          }
        }),
        catchError((error) => {
          this.toaster.error('Failed to add product', 'Error');
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
  }

  onPageChange(event: any): void {
    this.fetchProducts(event.pageIndex, event.pageSize, this.searchQuery);
  }

  editProduct(productId: string): void {
    const product = this.dataSource.data.find((p) => p.productId === productId);
    if (product) {
      const dialogRef = this.dialog.open(EditProductComponent, {
        width: '500px',
        data: product,
      });

      dialogRef
        .afterClosed()
        .pipe(
          tap((result) => {
            if (result) {
              delete result.id;
            }
          }),
          switchMap((result) =>
            result
              ? this.productService.editProduct(result, productId)
              : of(null)
          ),
          tap((response: any) => {
            if (response?.success) {
              this.fetchProducts();
              this.toaster.success(`${response.message}`);
            }
          }),
          catchError((error) => {
            this.toaster.error('Failed to edit product', 'Error');
            console.error(error);
            return of(null);
          })
        )
        .subscribe();
    }
  }

  deleteProduct(productId: string): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '500px',
      data: { id: productId },
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) =>
          result ? this.productService.removeProduct(productId) : of(null)
        ),
        tap((response: any) => {
          if (response?.success) {
            this.fetchProducts();
            this.toaster.success(`${response.message}`);
          }
        }),
        catchError((error) => {
          this.toaster.error('Failed to delete product', 'Error');
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
  }
}
