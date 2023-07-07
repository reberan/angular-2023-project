import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT: string = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS: string = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT: string = '[Shopping List] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT: string = '[Shopping List] DELETE_INGREDIENT';
export const START_EDIT: string = '[Shopping List] START_EDIT';
export const STOP_EDIT: string = '[Shopping List] STOP_EDIT';

export class AddIngredient implements Action {
  readonly type: string = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type: string = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type: string = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type: string = DELETE_INGREDIENT;
  constructor(public payload: any = null) {}
}

export class StartEdit implements Action {
  readonly type: string = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type: string = STOP_EDIT;
  constructor(public payload: any = null) {}
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
