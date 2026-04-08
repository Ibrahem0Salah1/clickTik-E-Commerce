import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

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
    });
  }
}
