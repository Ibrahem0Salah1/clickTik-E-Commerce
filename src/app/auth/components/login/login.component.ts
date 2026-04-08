<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  standalone: false,
=======
import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AllProductsComponent } from 'src/app/products/components/all-products/all-products.component';
@Component({
  selector: 'login',
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
<<<<<<< HEAD
  loginForm!: FormGroup;
  logedIn = false;
  currentUser: any;
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

=======
  constructor(
    private http: AuthService,
    private fb: FormBuilder,
    private route: Router
  ) {}
  loginForm: any = FormGroup;
  logedIn: boolean = false;
  currentUser: any;
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
<<<<<<< HEAD

    if (localStorage.getItem('token')) {
      this.fetchCurrentUser();
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const loginData = this.loginForm.value;

    this.authService.onLogin(loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.logedIn = true;
        this.isSubmitting = false;
        this.toastr.success('Login successful');
        this.router.navigateByUrl('/home/products/9/0/All');
      },
      error: () => {
        this.logedIn = false;
        this.isSubmitting = false;
        this.toastr.error('Invalid username or password');
      },
    });
  }

  private fetchCurrentUser(): void {
    this.authService.getAndAuthorizeCurrentUser().subscribe({
      next: (res: any) => {
        this.currentUser = res;
        this.logedIn = true;
      },
      error: () => {
        this.currentUser = null;
        this.logedIn = false;
      },
=======
    if (localStorage.getItem('token')) {
      this.getUser();
      this.logedIn = true;
    } else {
      this.logedIn = false;
    }
  }

  onSubmit() {
    const limit = 9;
    const skip = 0;
    const category = 'All';
    const loginData = this.loginForm.value;
    this.http.onLogin(loginData).subscribe((res: any) => {
      // console.log(res);
      localStorage.setItem('token', res.accessToken);
      console.log(res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      this.route.navigateByUrl(`home/products/${limit}/${skip}/${category}`);
    });
    this.authUser();
  }

  authUser() {
    this.http.getAndAuthorizeCurrentUser().subscribe({
      next: (user) => {
        // this.currentUser = user;
        // console.log(this.currentUser);
        this.logedIn = true;
        if (this.logedIn) {
          this.route.navigateByUrl('home/products/:limit/:skip/:category');
          // navigateByUrl('clickTik.com/home/products/9/0/All');
        }
      },
      error: (err) => {
        this.logedIn = false;
        console.log(this.logedIn);
      },
    });
  }
  getUser() {
    this.http.getAndAuthorizeCurrentUser().subscribe((res: any) => {
      this.currentUser = res;
      // JSON.parse(this.currentUser);
      console.log(this.currentUser);
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
    });
  }
}
