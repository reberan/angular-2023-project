import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  //Resolve, /* deprecated */
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';

import AppState from '../store/app.state';
import RecipesState from './store/recipes.state';
import { Recipe } from './recipe.model';
import * as RecipesActions from './store/recipes.actions';

export const recipesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  actions$: Actions = inject(Actions),
  store: Store<AppState> = inject(Store<AppState>)
): any =>
  store.select('recipes').pipe(
    take(1),
    map((recipesState: RecipesState) => recipesState.recipes),
    switchMap((recipes: Recipe[]) => {
      if (recipes.length > 0) {
        return of(recipes);
      } else {
        store.dispatch(new RecipesActions.FetchRecipes());
        return actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
      }
    })
  );

// /* deprecated */
// @Injectable({ providedIn: 'root' })
// export class RecipeResolverService implements Resolve<Recipe[]> {
//   constructor(private actions$: Actions, private store: Store<AppState>) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
//     return this.store.select('recipes').pipe(
//       take(1),
//       map((recipesState: RecipesState) => recipesState.recipes),
//       switchMap((recipes: Recipe[]) => {
//         if (recipes.length > 0) {
//           return of(recipes);
//         } else {
//           this.store.dispatch(new RecipesActions.FetchRecipes());
//           return this.actions$.pipe(
//             ofType(RecipesActions.SET_RECIPES),
//             take(1)
//           );
//         }
//       })
//     );
//   }
// }
