import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CartComponent } from './cart.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from '../../services/products.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    localStorage.setItem('cart', '[]');
    localStorage.setItem('userId', '1');

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getAndAuthorizeCurrentUser: () => of({ id: 1 }),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            addCart: () => of({ products: [], total: 0, totalQuantity: 0 }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('cart');
    localStorage.removeItem('userId');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
