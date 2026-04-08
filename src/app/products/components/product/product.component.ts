import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
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
      brand = category;
    }
    return brand;
  }

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
  }
}
