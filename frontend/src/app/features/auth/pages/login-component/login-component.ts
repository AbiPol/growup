import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormUtils } from '../../../../utils/forms.utils';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';

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

  constructor() { }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.formUtils.passPattern)]]
  });

  onSubmit() {
    if (this.loginForm.invalid && this.loginForm.touched && this.loginForm.dirty) {
      //console.log('Formulario invalido');
      this.hasError.set(true);
    } else {
      this.hasError.set(false);
      //console.log('Login data:', this.loginForm.value);
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/private']);
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.hasError.set(true);
        }
      });
      // TODO: Implement actual login service call
    }
  }
}
