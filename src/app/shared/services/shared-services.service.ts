import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SharedServicesService {
  constructor(private http: HttpClient) {}
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
  }
}
