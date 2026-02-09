import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Role } from '@shared/models/role.enum';

export const roleRedirectGuard: CanActivateChildFn = (childRoute, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const role = auth.userRole();
  const currentUrl = state.url;

  // console.log('entre en canactivatechild del guard ', role)
  // switch (role) {
  //   case Role.ADMIN:
  //     return router.createUrlTree(['/admin']);
  //   case Role.TEACHER:
  //     return router.createUrlTree(['/formador']);
  //   case Role.STUDENT:
  //     return router.createUrlTree(['student']);
  //   default:
  //     return router.createUrlTree(['/']);
  // }


  //console.log('Guard CHILD ejecutado', { role, currentUrl });

  // 1. ADMIN
  if (role == Role.ADMIN) {
    //console.log('entre en admin');
    if (currentUrl.startsWith('/private/admin')) return true;
    return router.createUrlTree(['/private/admin']);
  }

  // 2. TEACHER / FORMADOR
  if (role === Role.TEACHER) {
    if (currentUrl.startsWith('/private/teacher')) return true;
    return router.createUrlTree(['/private/teacher']);
  }

  // 3. STUDENT
  if (role === Role.STUDENT) {
    if (currentUrl.startsWith('/private/student')) return true;
    return router.createUrlTree(['/private/student']);
  }

  // 4. No autenticado
  return router.createUrlTree(['/auth/login']);

};
