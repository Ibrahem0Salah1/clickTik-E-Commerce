import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private service: ProductsService,
    private toastr: ToastrService,
    private route: Router
  ) {}
  goToProductDetails() {
    const title = this.product.title;
    const id = this.product.id;
    const cartC = this.cartCount;
    this.route.navigateByUrl(`clicktik.com/products/${title}/${id}/${cartC}`);
  }
  @Input() product: any = {};
  @Input() currentUser: any = {};
  ngOnInit(): void {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      this.cartCount = this.cartProducts.length;
    }
  }
  getDiscountPrice(price: any, disc: any) {
    return (price - (price * disc) / 100).toFixed(2);
  }
  getBrand(brand: any, category: any) {
    if (brand == null || undefined) {
      brand = category;
    }
    return brand;
  }
  cartProducts: any[] = [];
  added: boolean = false;
  toggleAddedToCart() {
    this.added = !this.added;
  }
  // @Output() cartProductsCount = new EventEmitter<number>();
  cartCount: any;
  @Output() countCart = new EventEmitter<any>();
  addToCartItem(product: any) {
    const quantity = 1;
    // let cartCount;
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(
        (item) => item.product.id == product.id
      );
      if (exist) {
        this.added = true;
        this.toastr.error('You already added the product to cart');
      } else {
        this.cartProducts.push({ product: product, quantity: quantity });
        this.cartCount = this.cartProducts.length;
        this.countCart.emit(this.cartCount);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        this.added = true;
        this.toastr.success('Product is added to your cart');
      }
    } else {
      this.cartProducts.push({ product: product, quantity: quantity });
      this.cartCount = this.cartProducts.length;
      this.countCart.emit(this.cartCount);
      this.toastr.success('Product is added to your cart');
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.added = true;
    }
    this.added = false;
  }
}
