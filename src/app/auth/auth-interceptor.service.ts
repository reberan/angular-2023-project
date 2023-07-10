import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, exhaustMap, map } from 'rxjs/operators';

import AuthState from './store/auth.state';
import AppState from '../store/app.state';
import { User } from './user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: AuthState) => authState.user),
      exhaustMap((user: User) => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user._token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
