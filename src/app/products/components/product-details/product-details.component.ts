<<<<<<< HEAD
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
=======
import {
  Component,
  ViewChild,
  HostListener,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
<<<<<<< HEAD
  @ViewChild('imgShowcase') imgShowcase!: ElementRef;

  id = 0;
  countCart = 0;
  quantity = 1;
  imgId = 1;
  product: any = {};

=======
  id: any;
  countCart: any;
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private toastr: ToastrService,
<<<<<<< HEAD
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

=======
    private nav: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(Number(this.id));
    this.countCart = this.route.snapshot.paramMap.get('countCart');
    console.log(this.countCart);
  }
  ngOnInit(): void {
    this.getProductById(this.id);
  }
  product: any = {};
  getProductById(id: any) {
    this.service.getProductById(id).subscribe((res: any) => {
      this.product = res;
      console.log(this.product);
    });
  }
  getDiscountPrice(price: any, disc: any) {
    return (price - (price * disc) / 100).toFixed(2);
  }
  //////////////////////////////////////////////////////////////////////
  cartProducts: any[] = [];
  quantity: any = 1;
  addToCartItem() {
    // let cartCount;
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(
        (item) => item.product.id == this.product.id
      );
      if (exist) {
        // this.added = true;
        this.toastr.error('You already added the product to cart');
      } else {
        this.cartProducts.push({
          product: this.product,
          quantity: this.quantity,
        });
        this.countCart = this.cartProducts.length;
        // this.countCart.emit(this.countCart);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        // this.added = true;
        this.toastr.success('Product is added to your cart');
        this.nav.navigateByUrl('home/products/9/0/All');
      }
    } else {
      // this.countCart = this.cartProducts.length;
      this.cartProducts.push({
        product: this.product,
        quantity: this.quantity,
      });
      this.countCart = this.cartProducts.length;
      // this.countCart.emit(this.countCart);
      this.toastr.success('Product is added to your cart');
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.nav.navigateByUrl('home/products/9/0/All');
      // this.added = true;
    }
    // this.added = false;
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  @ViewChild('imgShowcase') imgShowcase!: ElementRef;
  imgId: number = 1;
  productImages = {
    images: [], // This will be dynamically filled with images from the API
  };

  // This will be called after Angular checks the view, useful for dynamic content
  ngAfterViewChecked(): void {
    this.slideImage(); // Ensure the image sliding works after images are loaded
  }

  // Handle image click
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  onImgClick(event: Event, id: number): void {
    event.preventDefault();
    this.imgId = id;
    this.slideImage();
  }

<<<<<<< HEAD
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
=======
  // Function to slide the image based on the current imgId
  slideImage(): void {
    if (!this.imgShowcase || !this.imgShowcase.nativeElement) return;
    const displayWidth =
      this.imgShowcase.nativeElement.querySelector(
        'img:first-child'
      )?.clientWidth;
    if (displayWidth) {
      this.imgShowcase.nativeElement.style.transform = `translateX(${
        -(this.imgId - 1) * displayWidth
      }px)`;
    }
  }

  // Listen to window resize events and adjust the slider accordingly
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.slideImage();
  }
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
}
