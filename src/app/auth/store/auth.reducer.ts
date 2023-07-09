import AuthState from './auth.state';
import * as AuthActions from './auth.actions';
import { User } from '../user.model';

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  authError: null,
  isLoading: false,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions.AuthActions
) {
  let updatedState: AuthState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case AuthActions.LOGIN:
      const user: User = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      updatedState.authError = null;
      updatedState.isLoading = false;
      updatedState.isLoggedIn = true;
      updatedState.user = user;
      return updatedState;

    case AuthActions.LOGOUT:
      updatedState.authError = null;
      updatedState.isLoading = false;
      updatedState.isLoggedIn = false;
      updatedState.user = null;
      return updatedState;

    case AuthActions.LOGIN_FAIL:
      updatedState.authError = action.payload;
      updatedState.isLoading = false;
      updatedState.isLoggedIn = false;
      return updatedState;

    case AuthActions.LOGIN_START:
      updatedState.authError = null;
      updatedState.isLoading = true;
      updatedState.isLoggedIn = false;
      return updatedState;

    case AuthActions.CLEAR_ERROR:
      updatedState.authError = null;
      return updatedState;

    case AuthActions.SIGNUP_START:
      updatedState.authError = null;
      updatedState.isLoading = true;
      updatedState.isLoggedIn = false;
      return updatedState;

    case AuthActions.AUTO_LOGIN:
      return updatedState;

    case AuthActions.AUTO_LOGOUT:
      return updatedState;

    case AuthActions.SIGNUP:
      return updatedState;

    default:
      return updatedState;
  }
}
