import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { AuthStatus } from '../models/auth-status.enum';
import { inject } from '@angular/core';

export const isAuthorizateGuard: CanMatchFn = (route, segments) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  authService.checkAuthStatus();
  //console.log('authStatus: ', authService.checkAuthStatus);
  if (authService.authStatus() === AuthStatus.authenticated) {
    //router.navigate(['/private']);
    return true;
  }

  router.navigate(['/auth']);
  return false;
};  
