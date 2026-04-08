import {
  Component,
  EventEmitter,
  Input,
<<<<<<< HEAD
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: false,
=======
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
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
<<<<<<< HEAD
    private toastr: ToastrService,
    private route: Router,
    private cartService: CartService
  ) {}

  @Input() product: any = {};
  @Input() currentUser: any = {};
  @Output() countCart = new EventEmitter<number>();

  cartCount = 0;
  added = false;

  ngOnInit(): void {
    this.cartCount = this.cartService.getCartCount();
  }

  goToProductDetails() {
    const title = this.product.title;
    const id = this.product.id;
    const cartC = this.cartService.getCartCount();
    this.route.navigateByUrl(`/products/${title}/${id}/${cartC}`);
  }

  getDiscountPrice(price: any, disc: any) {
    return (price - (price * disc) / 100).toFixed(2);
  }

  getBrand(brand: any, category: any) {
    if (brand == null) {
=======
    private service: ProductsService,
    private toastr: ToastrService,
    private route: Router
  ) {}
  goToProductDetails() {
    const title = this.product.title;
    const id = this.product.id;
    const cartC = this.cartCount;
    this.route.navigateByUrl(`products/${title}/${id}/${cartC}`);
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
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
      brand = category;
    }
    return brand;
  }
<<<<<<< HEAD

  addToCartItem(product: any) {
    const result = this.cartService.addToCart(product, 1);
    this.cartCount = result.count;
    this.countCart.emit(this.cartCount);

    if (!result.added) {
      this.toastr.error('You already added the product to cart');
      return;
    } else {
      this.toastr.success('Product is added to your cart');
    }

    this.added = true;
    setTimeout(() => {
      this.added = false;
    }, 600);
=======
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
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  }
}
