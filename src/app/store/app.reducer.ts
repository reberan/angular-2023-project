import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../auth/store/auth.reducer';
import { shoppingListReducer } from '../shopping-list/store/shopping-list.reducer';
import AppState from './app.state';


export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  shoppingList: shoppingListReducer
}


