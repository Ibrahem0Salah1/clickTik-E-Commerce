import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Observable } from 'rxjs';

interface ProductListResponse {
  products: unknown[];
  total: number;
  skip: number;
  limit: number;
}

=======
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
@Injectable({
  providedIn: 'root',
})
export class SharedServicesService {
  constructor(private http: HttpClient) {}
<<<<<<< HEAD

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
=======
  getCategoryList() {
    return this.http.get('https://dummyjson.com/products/category-list');
  }
  // Filter
  getProductsByCategory(category: any) {
    return this.http.get(`https://dummyjson.com/products/category/${category}`);
  }

  // Search
  SearchProducts(key: any) {
    return this.http.get(`https://dummyjson.com/products/search?q=${key}`);
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  }
}
