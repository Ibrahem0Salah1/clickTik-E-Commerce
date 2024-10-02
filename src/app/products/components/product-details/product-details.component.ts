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
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  countCart: any;
  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private toastr: ToastrService,
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
  onImgClick(event: Event, id: number): void {
    event.preventDefault();
    this.imgId = id;
    this.slideImage();
  }

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
}
