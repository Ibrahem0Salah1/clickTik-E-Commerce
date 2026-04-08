import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoustomInterceptor } from './auth/coustom.interceptor';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ProductsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000, // Duration in milliseconds (3 seconds)
      closeButton: true, // Show close button
      progressBar: true, // Show progress bar
      tapToDismiss: true, // Allow tap to dismiss
      easeTime: 300,
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: CoustomInterceptor, multi: true },
  ],
  exports: [ReactiveFormsModule, AppRoutingModule, AuthModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
