import {
  Component,
  EventEmitter,
  Input,
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
  }
}
