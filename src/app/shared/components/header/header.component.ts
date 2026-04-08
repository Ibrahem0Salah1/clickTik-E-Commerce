import {
  Component,
  EventEmitter,
  Input,
<<<<<<< HEAD
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  logedIn = false;
  searchText = '';
  user: any;
  cartProducts: CartItem[] = [];
  emptyCart = false;
  quantity = 1;

  private readonly destroy$ = new Subject<void>();

  @Output() text = new EventEmitter<string>();
  @Input() countOfCart = 0;

  constructor(
    private route: Router,
    private auth: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.logedIn = Boolean(localStorage.getItem('token'));
    if (this.logedIn) {
      this.getUserId();
    }

    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.cartProducts = items;
        this.emptyCart = items.length > 0;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get cartCount(): number {
    return this.countOfCart || this.cartProducts.length;
  }

  getUserId(): void {
    this.auth.getAndAuthorizeCurrentUser().subscribe((res: any) => {
      this.user = res;
      localStorage.setItem('userId', String(this.user.id));
    });
  }

  onSearch(searchValue: string): void {
    this.searchText = searchValue;
    this.text.emit(searchValue);
  }

  setQuantity(cartProduct: CartItem): void {
    this.cartService.updateQuantity(cartProduct.product.id, cartProduct.quantity);
  }

  deleteCart(): void {
    this.cartService.clearCart();
  }

  checkout(): void {
    this.route.navigateByUrl('/cart');
=======
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  logedIn: boolean = false;
  constructor(private route: Router, private auth: AuthService) {}
  @Output() text = new EventEmitter<string>();
  @Input() countOfCart: any;
  ngOnChanges(changes: SimpleChanges): void {
    this.getCartProducts();
    this.quantity = 1;
  }
  ngOnInit(): void {
    this.getUserId();
    const token = localStorage.getItem('token');
    if (token) {
      this.logedIn = true;
    } else {
      this.logedIn = false;
    }
    console.log(this.countOfCart);
  }
  user: any;
  getUserId() {
    this.auth.getAndAuthorizeCurrentUser().subscribe((res: any) => {
      console.log(res);
      this.user = res;
      localStorage.setItem('userId', this.user.id);
    });
  }
  // countItems: any;
  searchText: any = '';
  onSearch(searchValue: any) {
    this.searchText = searchValue;
    this.text.emit(this.searchText);
    // console.log(this.searchText);
  }
  cartProducts: any[] = [];
  emptyCart: boolean = false;
  getCartProducts() {
    if ('cart' in localStorage) {
      this.emptyCart = true;
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      console.log(this.cartProducts);
    } else {
      // this.emptyCart = true;
    }
  }
  quantity: any = 1;
  setQuantity() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.quantity = 1;
  }
  //delete cart
  deleteCart() {
    localStorage.removeItem('cart');
    this.cartProducts = [];
  }
  checkout() {
    this.route.navigateByUrl('cart');
    this.quantity = 1;
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  }
}
