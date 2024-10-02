import { HttpClient } from '@angular/common/http';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  urlLimit: any = 9;
  urlSkip: any = 0;
  selectedCategory: string = 'All'; // Default category
  constructor(
    private http: ProductsService,
    private sharedService: SharedServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    console.log('he');
    this.urlLimit = Number(this.route.snapshot.paramMap.get('limit'));
    this.urlSkip = Number(this.route.snapshot.paramMap.get('skip'));
    console.log(this.urlLimit, this.urlSkip);
  }
  allProducts: any = [];
  allCategories: any = [];
  loadingSpinner: boolean = false;
  totalPages = 0;
  currentPage = 1;
  limit = 9;
  skip = 0;

  ngOnInit(): void {
    console.log('hel');
    this.getUser();
    this.refreshPage();
    this.cartCount();
  }
  cartCount() {
    if ('cart' in localStorage) {
      let cartProducts = JSON.parse(localStorage.getItem('cart')!);
      this.cartCountAll = cartProducts.length;
    }
  }
  cartCountAll: any;
  getCartCount(count: any) {
    this.cartCountAll = count;
    console.log(this.cartCountAll);
  }
  refreshPage() {
    this.route.paramMap.subscribe((params) => {
      this.urlLimit = Number(params.get('limit'));
      this.urlSkip = Number(params.get('skip'));
      this.selectedCategory = params.get('category') || 'All'; // Get category from URL or default to 'All'
      this.getAllProducts(this.urlLimit, this.urlSkip, this.selectedCategory);
    });
  }

  getAllProducts(limit: number, skip: number, category: string) {
    this.skip = skip;
    this.urlSkip = this.skip;
    this.loadingSpinner = true;

    if (category === 'All') {
      // Fetch all products
      this.http.getProducts(this.urlLimit, this.urlSkip).subscribe(
        (res: any) => {
          if (res.limit === 9) {
            this.totalPages = Math.ceil(res.total / res.limit);
          }
          this.searchText = '';
          this.allProducts = res.products;
          this.router.navigateByUrl(
            `home/products/${this.urlLimit}/${this.skip}/${this.selectedCategory}`
          );
          this.loadingSpinner = false;
        },
        (error) => {
          this.loadingSpinner = false;
        }
      );
    } else {
      // Fetch products by category
      this.sharedService.getProductsByCategory(category).subscribe(
        (res: any) => {
          this.allProducts = res.products;
          this.router.navigateByUrl(
            `home/products/${this.urlLimit}/${this.skip}/${this.selectedCategory}`
          );
          this.loadingSpinner = false;
        },
        (error) => {
          this.loadingSpinner = false;
        }
      );
    }
  }

  // Modify category selection to call getAllProducts with selected category
  onCategorySelected(category: string) {
    this.selectedCategory = category;
    this.getAllProducts(this.urlLimit, this.urlSkip, this.selectedCategory);
  }
  // pagination next and previous
  PreviousPage() {
    if (this.skip >= 9) {
      this.skip -= 9;
      this.getAllProducts(this.limit, Number(this.skip), this.selectedCategory);
    }
  }

  nextPage() {
    if (this.skip < 189) {
      this.skip += 9;
      this.getAllProducts(this.limit, Number(this.skip), this.selectedCategory);
    }
  }
  // search functionality
  searchText = '';
  onSearchText(searchValue: any) {
    console.log(searchValue);
    this.searchText = searchValue;
    this.selectedCategory = 'All';
    if (this.searchText == '') {
      `home/products/${this.urlLimit}/${this.skip}/${this.selectedCategory}`;
    }
    console.log(this.searchText);
    this.sharedService.SearchProducts(searchValue).subscribe((res: any) => {
      this.allProducts = res.products;
      console.log(this.allProducts.length);
      this.searchText = '';
    });
  }
  // getting CurrentUser
  currentUser: any;
  getUser() {
    this.auth.getAndAuthorizeCurrentUser().subscribe((res: any) => {
      this.currentUser = res;
      // JSON.parse(this.currentUser);
      console.log(this.currentUser);
    });
  }

  // countOfProducts on cart
}
