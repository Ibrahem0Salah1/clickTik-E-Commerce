import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
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
  }
}
