<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from '../../services/products.service';

interface CartApiResponse {
  products: any[];
  total: number;
  totalQuantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: false,
=======
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from '../../services/products.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
<<<<<<< HEAD
  readonly shippingCharge = 50;

  response: CartApiResponse = {
    products: [],
    total: 0,
    totalQuantity: 0,
  };

  cartLength = 0;
  loading = false;

  constructor(
    private auth: AuthService,
    private service: ProductsService,
    private route: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  goToProductDetails(product: any): void {
    const title = product.title;
    const id = product.id;
    this.route.navigateByUrl(`/products/${title}/${id}/${this.cartLength}`);
  }

  getProductTotal(product: any): number {
    return Number(product?.total ?? product?.price * product?.quantity ?? 0);
  }

  getDiscountedProductTotal(product: any): number {
    return Number(product?.discountedPrice ?? this.getProductTotal(product));
  }

  getGrandTotal(): number {
    return this.response.total + this.shippingCharge;
  }

  private loadCart(): void {
    this.cartLength = this.cartService.getCartCount();

    if (this.cartLength === 0) {
      this.response = { products: [], total: 0, totalQuantity: 0 };
      return;
    }

    const existingUserId = Number(localStorage.getItem('userId'));
    if (Number.isFinite(existingUserId) && existingUserId > 0) {
      this.pushCart(existingUserId);
      return;
    }

    this.auth.getAndAuthorizeCurrentUser().subscribe({
      next: (res: any) => {
        const userId = Number(res?.id || 0);
        localStorage.setItem('userId', String(userId));
        this.pushCart(userId);
      },
      error: () => {
        this.useLocalCartFallback();
      },
    });
  }

  private pushCart(userId: number): void {
    const products = this.cartService.toApiProductsPayload();
    if (!products.length || !userId) {
      this.useLocalCartFallback();
      return;
    }

    this.loading = true;
    this.service.addCart({ userId, products }).subscribe({
      next: (res: any) => {
        this.response = {
          products: res?.products || [],
          total: Number(res?.total || 0),
          totalQuantity: Number(res?.totalQuantity || 0),
        };
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.useLocalCartFallback();
      },
    });
  }

  private useLocalCartFallback(): void {
    const cartItems = this.cartService.getCartItems();
    const products = cartItems.map((item) => {
      const unitPrice = Number(item.product.price || 0);
      const discountPercentage = Number(item.product.discountPercentage || 0);
      const total = unitPrice * item.quantity;
      const discountedPrice = total - (total * discountPercentage) / 100;
      return {
        ...item.product,
        quantity: item.quantity,
        total,
        discountedPrice,
      };
    });

    const total = products.reduce(
      (sum, item) => sum + Number(item.discountedPrice || 0),
      0
    );
    const totalQuantity = products.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );

    this.response = {
      products,
      total,
      totalQuantity,
    };
=======
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
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  }
}
