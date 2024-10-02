import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
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
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [ReactiveFormsModule, AppRoutingModule, AuthModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
