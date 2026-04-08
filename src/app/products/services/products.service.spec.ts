import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
=======
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
<<<<<<< HEAD
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
=======
    TestBed.configureTestingModule({});
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
