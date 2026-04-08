import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterProductsComponent } from './components/filter-products/filter-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    SpinnerComponent,
    FooterComponent,
    FilterProductsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    SpinnerComponent,
    FooterComponent,
    FilterProductsComponent,
  ],
})
export class SharedModule {}
