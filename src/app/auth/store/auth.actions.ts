import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN: string = '[Auth] Login';
export const LOGIN_FAIL: string = '[Auth] Login Fail';
export const LOGOUT: string = '[Auth] Logout';
export const CLEAR_ERROR: string = '[Auth] Clear Error';
export const SIGNUP_START: string = '[Auth] Signup Start';
export const SIGNUP: string = '[Auth] Signup';
export const AUTO_LOGIN: string = '[Auth] Auto Login';
export const AUTO_LOGOUT: string = '[Auth] Auto Logout';

export class Login implements Action {
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

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFail implements Action {
  readonly type: string = LOGIN_FAIL;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
  constructor(public payload: any = null) {}
}

export class ClearError implements Action {
  readonly type: string = CLEAR_ERROR;
  constructor(public payload: any = null) {}
}

export class SignUp implements Action {
  readonly type: string = SIGNUP;
  constructor(public payload: any = null) {}
}

export class SignUpStart implements Action {
  readonly type: string = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AutoLogin implements Action {
  readonly type: string = AUTO_LOGIN;
  constructor(public payload: any = null) {}
}

export class AutoLogout implements Action {
  readonly type: string = AUTO_LOGOUT;
  constructor(public payload: any = null) {}
}

export type AuthActions =
  | Login
  | Logout
  | LoginStart
  | LoginFail
  | ClearError
  | SignUp
  | SignUpStart
  | AutoLogin
  | AutoLogout;
