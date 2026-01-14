import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { AuthStatus } from '../models/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.checkAuthStatus();
  console.log('authStatus: ', authService.authStatus());

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigate(['/private']);
    return false;
  }
  return true;
};
