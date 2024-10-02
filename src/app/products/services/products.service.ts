import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
// import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
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
  }
}
