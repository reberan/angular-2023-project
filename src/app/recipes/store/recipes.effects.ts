import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from './recipes.actions';
import AppState from 'src/app/store/app.state';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipesEffects {
  private recipesUrl: string =
    'https://ng-2023-project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(this.recipesUrl).pipe(
          map((recipes: Recipe[]) => {
            return recipes.map((recipe: Recipe) => {
              return { ...recipe, ingredients: recipe.ingredients || [] };
            });
          }),
          map((recipes: Recipe[]) => {
            return new RecipesActions.SetRecipes(recipes);
          })
        );
      }),
      tap(() => {
        this.router.navigate(['/recipes']);
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_, recipesState]) => {
          return this.http.put(this.recipesUrl, recipesState.recipes);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
