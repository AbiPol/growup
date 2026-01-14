import { computed, effect, Injectable, signal } from '@angular/core';
import { AuthStatus } from '../models/auth-status.enum';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.authResponse';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _statusUser = signal<AuthStatus>(AuthStatus.authenticated);
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('growup-token') || '');


  checkAuthStatus() {
    const token = localStorage.getItem('growup-token');
    console.log('token: ', token);
    if (token) {
      this._user.set({ id: '1', name: 'Prueba', email: 'prueba@gmail.com', isActive: true, role: Role.STUDENT });
      this._statusUser.set(AuthStatus.authenticated);
      this._token.set(token);
      return true;
    } else {
      this.logout();
      return false;
    }
  }


  authStatus = computed<AuthStatus>(() => {
    //Revisando el usuario
    if (this._statusUser() === AuthStatus.checking) return AuthStatus.checking

    //Si hay user es que estamos autenticados
    //console.log('user: ', this._user());
    if (this._user()) {
      return AuthStatus.authenticated;
    }
    return AuthStatus.notAuthenticated
  })

  //Valor get en el que enviamos el valor de ese usuario
  //El computed es de solo lectura y asi no podemos modificar su valor, ya que depende del signal _user
  user = computed<User | null>(() => this._user())
  token = computed(() => this._token())

  userRole() {
    //console.log('role en el servicio: ', this._user());
    return this._user()?.role;
  }

  userIsActive() {
    return this._user()?.isActive;
  }

  login(email: string, password: string): Observable<boolean> {
    console.log('login');
    return of(this.handleAuthSuccess({ token: 'token', user: { id: '1', name: 'Prueba', email: 'prueba@gmail.com', isActive: true, role: Role.STUDENT } }));
  }

  logout() {
    console.log('logout');
    this._user.set(null);
    this._statusUser.set(AuthStatus.notAuthenticated);
    this._token.set(null);

    localStorage.removeItem('growup-token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._statusUser.set(AuthStatus.authenticated);
    this._token.set(token);

    localStorage.setItem('growup-token', token);

    return true;
  }
}
