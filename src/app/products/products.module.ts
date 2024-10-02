import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductComponent } from './components/product/product.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoustomInterceptor } from '../auth/coustom.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SearchComponent } from '../shared/components/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
@NgModule({
  declarations: [AllProductsComponent, ProductComponent, CartComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000, // Duration in milliseconds (3 seconds)
      progressBar: true, // Show progress bar // Allow tap to dismiss
      easeTime: 300,
    }),
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HeaderComponent,
    SearchComponent,
    CartComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CoustomInterceptor, multi: true },
  ],
})
export class ProductsModule {}
