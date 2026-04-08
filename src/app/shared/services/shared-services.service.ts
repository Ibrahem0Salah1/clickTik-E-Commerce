import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ProductListResponse {
  products: unknown[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class SharedServicesService {
  constructor(private http: HttpClient) {}

  getCategoryList(): Observable<string[]> {
    return this.http.get<string[]>('https://dummyjson.com/products/category-list');
  }

  getProductsByCategory(
    category: string,
    limit: number,
    skip: number
  ): Observable<ProductListResponse> {
    const encodedCategory = encodeURIComponent(category);
    return this.http.get<ProductListResponse>(
      `https://dummyjson.com/products/category/${encodedCategory}?limit=${limit}&skip=${skip}`
    );
  }

  searchProducts(
    key: string,
    limit: number,
    skip: number
  ): Observable<ProductListResponse> {
    const encodedKey = encodeURIComponent(key.trim());
    return this.http.get<ProductListResponse>(
      `https://dummyjson.com/products/search?q=${encodedKey}&limit=${limit}&skip=${skip}`
    );
  }
}
