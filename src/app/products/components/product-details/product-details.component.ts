import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('imgShowcase') imgShowcase!: ElementRef;

  id = 0;
  countCart = 0;
  quantity = 1;
  imgId = 1;
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private toastr: ToastrService,
    private nav: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id') || 0);
    this.countCart = Number(this.route.snapshot.paramMap.get('countCart') || 0);
    this.getProductById(this.id);
  }

  getDiscountPrice(price: number, disc: number): string {
    return (price - (price * disc) / 100).toFixed(2);
  }

  addToCartItem(): void {
    const safeQuantity = this.normalizeQuantity(this.quantity);
    const result = this.cartService.addToCart(this.product, safeQuantity);

    if (!result.added) {
      this.toastr.error('You already added the product to cart');
      return;
    }

    this.countCart = result.count;
    this.toastr.success('Product is added to your cart');
    this.nav.navigateByUrl('/home/products/9/0/All');
  }

  onImgClick(event: Event, id: number): void {
    event.preventDefault();
    this.imgId = id;
    this.slideImage();
  }

  slideImage(): void {
    if (!this.imgShowcase?.nativeElement) {
      return;
    }

    const displayWidth =
      this.imgShowcase.nativeElement.querySelector('img:first-child')?.clientWidth;
    if (!displayWidth) {
      return;
    }

    this.imgShowcase.nativeElement.style.transform = `translateX(${
      -(this.imgId - 1) * displayWidth
    }px)`;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.slideImage();
  }

  private getProductById(id: number): void {
    this.service.getProductById(id).subscribe((res: any) => {
      this.product = res;
      this.imgId = 1;
      setTimeout(() => this.slideImage());
    });
  }

  private normalizeQuantity(quantity: number): number {
    if (!Number.isFinite(quantity)) {
      return 1;
    }
    return Math.max(1, Math.floor(quantity));
  }
}
