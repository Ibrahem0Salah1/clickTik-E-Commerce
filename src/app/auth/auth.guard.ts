import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    const router = inject(Router);
    router.navigateByUrl('login');
    return false;
  }
};
