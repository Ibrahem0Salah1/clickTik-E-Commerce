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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  logedIn: boolean = false;
  constructor(private route: Router) {}
  @Output() text = new EventEmitter<string>();
  @Input() countOfCart: any;
  ngOnChanges(changes: SimpleChanges): void {
    this.getCartProducts();
    this.quantity = 1;
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.logedIn = true;
    } else {
      this.logedIn = false;
    }
    console.log(this.countOfCart);
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
    this.route.navigateByUrl('clicktik.com/cart');
    this.quantity = 1;
  }
}
