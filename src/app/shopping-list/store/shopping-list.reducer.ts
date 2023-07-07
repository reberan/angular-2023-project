import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import ShoppingListState from './shopping-list.state';

const initialState: ShoppingListState = {
  ingredients: [],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: ShoppingListState = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  let updatedState: ShoppingListState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      const newIngredient: Ingredient = action.payload as Ingredient;
      updatedState.ingredients.push(newIngredient);
      return updatedState;

    case ShoppingListActions.ADD_INGREDIENTS:
      const newIngredients: Ingredient[] = action.payload as Ingredient[];
      updatedState.ingredients = [
        ...updatedState.ingredients,
        ...newIngredients,
      ];
      return updatedState;

    case ShoppingListActions.UPDATE_INGREDIENT:
      const updateIndex: number = updatedState.editedIngredientIndex;
      const updatedIngredient: Ingredient = action.payload as Ingredient;
      updatedState.ingredients[updateIndex] = updatedIngredient;
      updatedState.editedIngredient = null;
      updatedState.editedIngredientIndex = -1;
      return updatedState;

    case ShoppingListActions.DELETE_INGREDIENT:
      const deleteIndex: number = updatedState.editedIngredientIndex;
      updatedState.ingredients.splice(deleteIndex, 1);
      updatedState.editedIngredient = null;
      updatedState.editedIngredientIndex = -1;
      return updatedState;

    case ShoppingListActions.START_EDIT:
      const editedIngredientIndex: number = action.payload as number;
      const editedIngrendient: Ingredient =
        updatedState.ingredients[editedIngredientIndex];
      updatedState.editedIngredient = editedIngrendient;
      updatedState.editedIngredientIndex = editedIngredientIndex;
      return updatedState;

    case ShoppingListActions.STOP_EDIT:
      updatedState.editedIngredient = null;
      updatedState.editedIngredientIndex = -1;
      return updatedState;

    default:
      return updatedState;
  }
}
