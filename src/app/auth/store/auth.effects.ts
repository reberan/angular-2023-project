import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

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

const handleAuthentication = (
  email: string,
  userId: string,
  token: string,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.Login({ email, userId, token, expirationDate });
};

const handleError = (errorResponse: any) => {
  let errorMessage: string = 'An unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.LoginFail(errorMessage));
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
  return of(new AuthActions.LoginFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  private apiKey: string = environment.apiKey;
  private signUpEndPoint: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private loginEndPoint: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

  // FIX THIS
  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignUp) => {
        const payload = {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true,
        };
        const url = this.signUpEndPoint + '?key=' + this.apiKey;
        this.http.post<AuthResponseData>(url, payload);
      }).pipe(
        tap((responseData) => {
          this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
        }),
        map((responseData) => {
          handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      )
    )
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate['/auth'];
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'NO_ACTION' };
        }
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return new AuthActions.Login({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
          });
        }
        return { type: 'NO_ACTION' };
      })
    )
  );

  // FIX THIS
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        const payload = {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        };
        const url = this.loginEndPoint + '?key=' + this.apiKey;
        return this.http.post<AuthResponseData>(url, payload);
      }).pipe(
        tap((responseData) => {
          this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
        }),
        map((responseData) => {
          return handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        }),
        catchError((errorResponse) => {
          return handleError(errorResponse);
        })
      )
    )
  );

  // FIX THIS
  authRedirect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN),
      tap(() => {
        this.router.navigate(['/']);
      }),
      { dispatch: false }
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
