import { User } from '../user.model';

export interface AuthState {
  user: User;
  isLoggedIn: boolean;
  authError: string;
  isLoading: boolean;
}

export default AuthState;
