import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

=======
import { AppRoutingModule } from '../app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ProductsModule } from '../products/products.module';
import { CoustomInterceptor } from './coustom.interceptor';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    RouterModule,
    SharedModule,
  ],
  exports: [LoginComponent],
=======
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  exports: [LoginComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CoustomInterceptor, multi: true },
  ],
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
})
export class AuthModule {}
