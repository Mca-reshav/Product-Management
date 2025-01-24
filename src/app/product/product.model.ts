export interface ListProductRequest {
  page: number;
  limit: number;
  search: string;
  sortField: string;
  sortOrder: string;
}

export interface AddProductRequest {
  brand: string,
  name: string,
  description: string,
  price: number,
  category: string,
  stock:number,
  rating: string
}

export interface EditProductRequest {
  brand: string,
  name: string,
  description: string,
  price: number,
  category: string,
  stock:number,
  rating: string
}
