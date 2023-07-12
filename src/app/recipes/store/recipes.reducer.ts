import RecipesState from './recipes.state';
import * as RecipesActions from './recipes.actions';
import { Recipe } from '../recipe.model';

const initialState: RecipesState = {
  recipes: [],
};

export function recipesReducer(
  state: RecipesState = initialState,
  action: RecipesActions.RecipesAction
) {
  let updatedState: RecipesState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      const recipes: Recipe[] = action.payload;
      updatedState.recipes = recipes;
      return updatedState;

    case RecipesActions.ADD_RECIPE:
      const newRecipe: Recipe = action.payload;
      updatedState.recipes.push(newRecipe);
      return updatedState;

    case RecipesActions.UPDATE_RECIPE:
      const updateIndex: number = action.payload.index;
      const updatedRecipe: Recipe = action.payload.recipe;
      updatedState.recipes[updateIndex] = updatedRecipe;
      return updatedState;

    case RecipesActions.DELETE_RECIPE:
      const deleteIndex: number = action.payload;
      updatedState.recipes.splice(deleteIndex, 1);
      return updatedState;

    default:
      return updatedState;
  }
}
