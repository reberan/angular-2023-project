import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private recipesUrl: string =
    'https://ng-2023-project-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  public storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.recipesUrl, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  public loadRecipes() {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe: Recipe) => {
          return { ...recipe, ingredients: recipe.ingredients || [] };
        });
      }),
      tap((response) => {
        this.recipeService.setRecipes(response);
      })
    );
  }
}
