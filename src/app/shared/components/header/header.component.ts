import {
  Component,
  EventEmitter,
  Input,
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
  }
}
