import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Observable } from 'rxjs';

interface ProductListResponse {
  products: unknown[];
  total: number;
  skip: number;
  limit: number;
}

interface AddCartPayload {
  userId: number;
  products: Array<{ id: number; quantity: number }>;
}

=======
import { Route, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
// import { Router } from '@angular/router';
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
<<<<<<< HEAD
  constructor(private http: HttpClient) {}
  private allProductsURL = 'https://dummyjson.com/products';
  private addCartURL = 'https://dummyjson.com/carts/add';
  private productByIdURL = 'https://dummyjson.com/products/';

  getProducts(limit: number, skip: number): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(
      `${this.allProductsURL}?limit=${limit}&skip=${skip}`
    );
  }

  addCart(cart: AddCartPayload): Observable<any> {
    return this.http.post(this.addCartURL, cart);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.productByIdURL}${id}`);
=======
  constructor(private http: HttpClient, private route: Router) {}
  private allProductsURL = 'https://dummyjson.com/products';
  private addCartURL = 'https://dummyjson.com/carts/add';
  private productByIdURL = 'https://dummyjson.com/products/';
  getProducts(limit: number, skip: number) {
    return this.http.get(`${this.allProductsURL}?limit=${limit}&skip=${skip}`);
  }
  addCart(cart: any) {
    return this.http.post(this.addCartURL, cart);
  }
  getProductById(id: any) {
    return this.http.get(this.productByIdURL + id);
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  }
}
