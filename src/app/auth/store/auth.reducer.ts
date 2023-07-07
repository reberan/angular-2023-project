import AuthState from './auth.state';
import * as AuthActions from './auth.actions';
import { User } from '../user.model';

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
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
      updatedState.user = user;
      updatedState.isLoggedIn = true;
      return updatedState;

    case AuthActions.LOGOUT:
      updatedState.user = null;
      updatedState.isLoggedIn = false;
      return updatedState;

    default:
      return updatedState;
  }
}
