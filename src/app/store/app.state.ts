import AuthState from '../auth/store/auth.state';
import RecipesState from '../recipes/store/recipes.state';
import ShoppingListState from '../shopping-list/store/shopping-list.state';

export interface AppState {
  auth: AuthState;
  recipes: RecipesState;
  shoppingList: ShoppingListState;
}

export default AppState;
