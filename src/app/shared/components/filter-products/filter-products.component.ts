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
    });
  }
}
