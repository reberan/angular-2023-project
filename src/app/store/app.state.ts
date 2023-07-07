import AuthState from '../auth/store/auth.state';
import ShoppingListState from '../shopping-list/store/shopping-list.state';

export interface AppState {
  auth: AuthState;
  shoppingList: ShoppingListState;
}

export default AppState;
