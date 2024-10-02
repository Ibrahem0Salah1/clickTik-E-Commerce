import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from '../../services/products.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  user: any = {};
  constructor(
    private auth: AuthService,
    private service: ProductsService,
    private route: Router
  ) {
    this.getUserId();
  }
  getUserId() {
    this.auth.getAndAuthorizeCurrentUser().subscribe((res: any) => {
      console.log(res);
      this.user = res;
      localStorage.setItem('userId', this.user.id);
    });
  }
  ngOnInit(): void {
    this.getUserId();
    this.addToCart();
  }
  response: any = {};
  pushCart() {
    const userId = JSON.parse(localStorage.getItem('userId')!);
    const cartProducts = JSON.parse(localStorage.getItem('cart')!);
    let products = [];
    this.cartLength = cartProducts.length;
    console.log(cartProducts);
    for (let product of cartProducts) {
      products.push({ id: product.product.id, quantity: product.quantity });
      console.log(products);
      // console.log(products);
    }
    this.service
      .addCart({
        userId: userId,
        products: products,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.response = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  cartLength: any;
  addToCart() {
    if ('cart' in localStorage && 'userId' in localStorage) {
      this.pushCart();
    } else {
      this.getUserId();
      this.pushCart();
    }
  }
  goToProductDetails(product: any) {
    console.log(product);
    const title = product.title;
    const id = product.id;
    const cartC = this.response.products.length;
    this.route.navigateByUrl(`products/${title}/${id}/${cartC}`);
  }
}
