import { Action } from '@ngrx/store';

export const LOGIN: string = '[Auth] LOGIN';
export const LOGOUT: string = '[Auth] LOGOUT';
export const SIGN_UP: string = '[Auth] SIGN_UP';

export class LoginAction implements Action {
  readonly type: string = LOGIN;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class LogoutAction implements Action {
  readonly type: string = LOGOUT;
  constructor(public payload: any = null) {}
}

export class SignUpActions implements Action {
  readonly type: string = SIGN_UP;
  constructor(public payload: any = null) {}
}

export type AuthActions = LoginAction | LogoutAction;
