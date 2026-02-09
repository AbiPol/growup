import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormUtils } from '../../../../utils/forms.utils';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { Role } from '@shared/models/role.enum';

@Component({
  selector: 'growup-login-component',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './login-component.html',
  styles: ``
})
export class LoginComponent {

  formUtils = FormUtils;

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  hasSuccess = signal(false);

  constructor() { }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.formUtils.passPattern)]]
  });

  onSubmit() {
    if (this.loginForm.touched || this.loginForm.dirty) {
      if (this.loginForm.invalid) {
        //console.log('Formulario invalido');
        this.hasError.set(true);
      } else {
        this.hasError.set(false);
        this.hasSuccess.set(false);
        //console.log('Login data:', this.loginForm.value);
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe({
          next: () => {
            switch (this.authService.userRole()) {
              case Role.STUDENT:
                this.router.navigate(['/private/student']);
                break;
              case Role.TEACHER:
                console.log('TEACHER');
                this.router.navigate(['/private/teacher']);
                break;
              case Role.ADMIN:
                this.router.navigate(['/private/admin']);
                break;
            }
          },
          error: (err) => {
            console.error('Error al iniciar sesión:', err);
            this.hasError.set(true);
          }
        });
        // TODO: Implement actual login service call
      }
    } else {
      this.hasSuccess.set(false);
    }
  }
}
