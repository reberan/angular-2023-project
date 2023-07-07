import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as AuthActions from './store/auth.actions';
import AppState from '../store/app.state';
import { User } from './user.model';
import { environment } from 'src/environment/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName?: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiKey: string = environment.apiKey;
  private signUpEndPoint: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private loginEndPoint: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  signUp(email: string, password: string) {
    const payload = { email, password, returnSecureToken: true };
    const url = this.signUpEndPoint + '?key=' + this.apiKey;
    return this.http.post<AuthResponseData>(url, payload).pipe(
      catchError(this.handleErrors),
      tap((responseData) =>
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        )
      )
    );
  }

  autoLogin(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.store.dispatch(
        new AuthActions.LoginAction({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
        })
      );
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  login(email: string, password: string) {
    const payload = { email, password, returnSecureToken: true };
    const url = this.loginEndPoint + '?key=' + this.apiKey;
    return this.http.post<AuthResponseData>(url, payload).pipe(
      catchError(this.handleErrors),
      tap((responseData) =>
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        )
      )
    );
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.store.dispatch(new AuthActions.LogoutAction());
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.store.dispatch(
      new AuthActions.LoginAction({ email, userId, token, expirationDate })
    );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleErrors(errorResponse: HttpErrorResponse) {
    let errorMessage: string = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator';
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists, please choose another!';
    }
    return throwError(errorMessage);
  }
}
