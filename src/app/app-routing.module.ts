import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { ProductComponent } from './products/components/product/product.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { authGuard } from './auth/auth.guard';
import { FilterProductsComponent } from './shared/components/filter-products/filter-products.component';
import { CartComponent } from './products/components/cart/cart.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: AllProductsComponent, canActivate: [authGuard] },
  {
    path: 'home/products/:limit/:skip/:category',
    component: AllProductsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'products/:product/:id/:countCart',
    component: ProductDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'home/products/9/0/All',
    pathMatch: 'full',
  },
  // { path: 'product', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
