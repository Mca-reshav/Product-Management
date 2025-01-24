import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../routes/product.routes';
import { AddProductRequest, EditProductRequest, ListProductRequest } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(data: ListProductRequest): Observable<any> {
    return this.http.get<any>(API_ROUTES.list, {params: {...data}});
  }

  addProduct(data: AddProductRequest): Observable<any> {
    return this.http.post<any>(API_ROUTES.add, data);
  }

  removeProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${API_ROUTES.remove}/${productId}`);
  }

  editProduct(data: EditProductRequest, productId: string): Observable<any> {
    return this.http.put<any>(`${API_ROUTES.edit}/${productId}`, data);
  }
}
