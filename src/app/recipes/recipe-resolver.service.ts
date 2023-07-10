import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';

import AppState from '../store/app.state';
import RecipesState from './store/recipes.state';
import { Recipe } from './recipe.model';
import * as RecipesActions from './store/recipes.actions';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState: RecipesState) => recipesState.recipes),
      switchMap((recipes: Recipe[]) => {
        if (recipes.length > 0) {
          return of(recipes);
        } else {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        }
      })
      /*switchMap((recipes: Recipe[]) => {
        if (recipes.length === 0) {
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      }*/
    );
  }

  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<{ recipes: Recipe[] }>
  //   | Promise<{ recipes: Recipe[] }>
  //   | { recipes: Recipe[] } {
  //   this.store.select('recipes').pipe(
  //     take(1),
  //     map((recipesState: RecipesState) => recipesState.recipes),
  //     switchMap((recipes: Recipe[]) => {
  //       if (recipes.length === 0) {
  //         this.store.dispatch(new RecipesActions.FetchRecipes());
  //         return this.actions$.pipe(
  //           ofType(RecipesActions.SET_RECIPES),
  //           take(1)
  //         );
  //       } else {
  //         return of({ recipes });
  //       }
  //     })
  //   );
  //   return this.store.dispatch(new RecipesActions.FetchRecipes());
  // }
}
