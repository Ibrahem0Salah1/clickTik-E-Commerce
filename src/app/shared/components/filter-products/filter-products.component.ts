<<<<<<< HEAD
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedServicesService } from '../../services/shared-services.service';

@Component({
  selector: 'app-filter-products',
  standalone: false,
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.css'],
})
export class FilterProductsComponent implements OnInit {
  @Input() selectedCategory = 'All';
  @Output() categoryChange = new EventEmitter<string>();

  allCategories: string[] = [];
  categorySearch = '';

  constructor(private sharedService: SharedServicesService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.categoryChange.emit(category);
  }

  get filteredCategories(): string[] {
    const query = this.categorySearch.trim().toLowerCase();
    if (!query) {
      return this.allCategories;
    }

    return this.allCategories.filter((category) =>
      category.toLowerCase().includes(query)
    );
  }

  get selectedCategoryLabel(): string {
    if (this.selectedCategory === 'All') {
      return 'All Products';
    }
    return this.formatCategoryLabel(this.selectedCategory);
  }

  formatCategoryLabel(category: string): string {
    return category
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  clearCategoryFilter(): void {
    this.categorySearch = '';
  }

  private getAllCategories(): void {
    this.sharedService.getCategoryList().subscribe((res) => {
      this.allCategories = res;
=======
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedServicesService } from '../../services/shared-services.service';
@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.css'],
})
export class FilterProductsComponent {
  constructor(private http: SharedServicesService) {}
  ngOnInit(): void {
    this.getAllCategories();
  }
  allCategories: any[] = [];
  selectedCategory: string = 'All';
  @Output() categoryChange = new EventEmitter<string>();
  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.categoryChange.emit(this.selectedCategory);
  }
  getAllCategories() {
    this.http.getCategoryList().subscribe((res: any) => {
      this.allCategories = res;
      console.log(this.allCategories);
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
    });
  }
}
