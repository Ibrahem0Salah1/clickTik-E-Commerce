<<<<<<< HEAD
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import { ProductsService } from '../../services/products.service';

interface ProductListResponse {
  products: any[];
  total: number;
  skip: number;
  limit: number;
}

@Component({
  selector: 'app-all-products',
  standalone: false,
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private searchDebounce: ReturnType<typeof setTimeout> | null = null;

  readonly defaultLimit = 9;
  limit = this.defaultLimit;
  skip = 0;
  selectedCategory = 'All';
  searchText = '';
  displayedSearchText = '';

  allProducts: any[] = [];
  loadingSpinner = false;
  totalPages = 1;
  currentPage = 1;
  totalItems = 0;

  cartCountAll = 0;
  currentUser: any;

  constructor(
    private productsService: ProductsService,
=======
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
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
    private sharedService: SharedServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
<<<<<<< HEAD
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getUser();

    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.cartCountAll = items.length;
      });

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.limit = this.toPositiveNumber(
        params.get('limit'),
        this.defaultLimit
      );
      this.skip = this.toNonNegativeNumber(params.get('skip'), 0);
      this.selectedCategory = params.get('category') || 'All';

      // URL state controls browse mode; search stays as ephemeral UI state.
      this.searchText = '';
      this.displayedSearchText = '';

      this.fetchProducts();
    });
  }

  ngOnDestroy(): void {
    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce);
      this.searchDebounce = null;
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  get canShowPagination(): boolean {
    return this.totalPages > 1;
  }

  get visiblePageNumbers(): number[] {
    const pageWindow = 5;
    const half = Math.floor(pageWindow / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + pageWindow - 1);

    if (end - start + 1 < pageWindow) {
      start = Math.max(1, end - pageWindow + 1);
    }

    const pages: number[] = [];
    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    return pages;
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.searchText = '';
    this.displayedSearchText = '';
    this.navigateToList(0, this.selectedCategory);
  }

  onSearchText(searchValue: string): void {
    const query = searchValue.trim();
    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce);
    }

    this.searchDebounce = setTimeout(() => {
      const shouldNavigateToAll =
        this.selectedCategory !== 'All' ||
        this.skip !== 0 ||
        this.limit !== this.defaultLimit;

      this.searchText = query;
      this.displayedSearchText = query;
      this.skip = 0;

      if (!query) {
        this.selectedCategory = 'All';
        this.limit = this.defaultLimit;

        if (shouldNavigateToAll) {
          this.navigateToList(0, 'All');
        } else {
          // Same route case: force refresh of normal product list.
          this.fetchProducts();
        }
        return;
      }

      this.fetchProducts();
    }, 250);
  }

  previousPage(): void {
    if (this.currentPage <= 1) {
      return;
    }
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages) {
      return;
    }
    this.goToPage(this.currentPage + 1);
  }

  goToPage(page: number): void {
    const safePage = Math.min(Math.max(page, 1), this.totalPages);
    const nextSkip = (safePage - 1) * this.limit;

    if (this.searchText) {
      this.skip = nextSkip;
      this.fetchProducts();
      return;
    }

    this.navigateToList(nextSkip, this.selectedCategory);
  }

  getCartCount(count: number): void {
    this.cartCountAll = count;
  }

  private fetchProducts(): void {
    this.loadingSpinner = true;

    if (this.searchText) {
      this.sharedService
        .searchProducts(this.searchText, this.limit, this.skip)
        .subscribe({
          next: (res) => this.handleProductsResponse(res),
          error: () => this.handleProductsError(),
        });
      return;
    }

    if (this.selectedCategory === 'All') {
      this.productsService.getProducts(this.limit, this.skip).subscribe({
        next: (res) => this.handleProductsResponse(res),
        error: () => this.handleProductsError(),
      });
      return;
    }

    this.sharedService
      .getProductsByCategory(this.selectedCategory, this.limit, this.skip)
      .subscribe({
        next: (res) => this.handleProductsResponse(res),
        error: () => this.handleProductsError(),
      });
  }

  private handleProductsResponse(res: ProductListResponse): void {
    this.allProducts = res.products || [];
    this.totalItems = res.total ?? this.allProducts.length;
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.limit));
    this.currentPage = Math.floor(this.skip / this.limit) + 1;
    this.loadingSpinner = false;
  }

  private handleProductsError(): void {
    this.allProducts = [];
    this.totalItems = 0;
    this.totalPages = 1;
    this.currentPage = 1;
    this.loadingSpinner = false;
  }

  private getUser(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.currentUser = null;
      return;
    }

    this.auth.getAndAuthorizeCurrentUser().subscribe({
      next: (res: any) => {
        this.currentUser = res;
      },
      error: () => {
        this.currentUser = null;
      },
    });
  }

  private navigateToList(skip: number, category: string): void {
    this.router.navigate(['/home/products', this.limit, skip, category]);
  }

  private toPositiveNumber(value: string | null, fallback: number): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return fallback;
    }
    return Math.floor(parsed);
  }

  private toNonNegativeNumber(value: string | null, fallback: number): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return fallback;
    }
    return Math.floor(parsed);
  }
=======
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
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
}
