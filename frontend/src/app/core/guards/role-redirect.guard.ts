import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { Role } from '../../core/models/role.enum';

export const roleRedirectGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const role = auth.userRole();

  console.log('entre en canactivate del guard ', role)
  switch (role) {
    case Role.ADMIN:
      return router.createUrlTree(['/private/admin']);
    case Role.TEACHER:
      return router.createUrlTree(['/private/formador']);
    default:
      return router.createUrlTree(['/private/student']);
  }

};
