import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const FETCH_RECIPES: string = '[Recipes] Fetch Recipes';
export const STORE_RECIPES: string = '[Recipes] Store Recipes';
export const SET_RECIPES: string = '[Recipes] Set Recipes';
export const ADD_RECIPE: string = '[Recipes] Add Recipe';
export const UPDATE_RECIPE: string = '[Recipes] Update Recipe';
export const DELETE_RECIPE: string = '[Recipes] Delete Recipe';

export class FetchRecipes implements Action {
  readonly type: string = FETCH_RECIPES;
  constructor(public payload: any = null) {}
}

export class StoreRecipes implements Action {
  readonly type: string = STORE_RECIPES;
  constructor(public payload: any = null) {}
}

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type: string = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type: string = UPDATE_RECIPE;
  constructor(public payload: { index: number; recipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type: string = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export type RecipesAction =
  | FetchRecipes
  | StoreRecipes
  | SetRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe;
