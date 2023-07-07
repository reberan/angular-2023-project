import { User } from '../user.model';

export interface AuthState {
  user: User;
  isLoggedIn: boolean;
}

export default AuthState;
