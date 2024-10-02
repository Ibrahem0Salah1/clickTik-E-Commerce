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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private http: AuthService,
    private fb: FormBuilder,
    private route: Router
  ) {}
  loginForm: any = FormGroup;
  logedIn: boolean = false;
  currentUser: any;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
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
    });
  }
}
