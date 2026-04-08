import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterProductsComponent } from './components/filter-products/filter-products.component';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

=======
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ProductsModule } from '../products/products.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
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
<<<<<<< HEAD
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
=======
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
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
