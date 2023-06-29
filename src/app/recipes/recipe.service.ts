import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

export class RecipeService {
  //recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  /*
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipes%2F2022-11-cacio-e-pepe-brussels-sprouts%2Fcacio-e-pepe-brussels-sprouts-0107',
      [
        new Ingredient('Apples', 5),
        new Ingredient('Blueberries', 15),
        new Ingredient('Strawberries', 7),
        new Ingredient('Bananas', 3),
      ]
    ),
    new Recipe(
      'A Test Recipe 2',
      'This is simply a test 2',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2-853x1024.jpg',
      [
        new Ingredient('Oranges', 2),
        new Ingredient('Watermelon', 11),
        new Ingredient('Cherries', 45),
        new Ingredient('Raspberries', 31),
      ]
    ),
    new Recipe(
      'A Test Recipe 3',
      'This is simply a test 3',
      'https://www.eatingwell.com/thmb/Q41yPc8R2PKlBSXZNbBpyzaom_A=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cucumber-sandwich-eddcc95811f5426094ea5dbea6a6b026.jpg',
      [
        new Ingredient('Chicken Legs', 5),
        new Ingredient('Coconut Milk', 1),
        new Ingredient('Red Onions', 7),
        new Ingredient('Green Curry', 3),
      ]
    ),
    new Recipe(
      'A Test Recipe 4',
      'This is simply a test 4',
      'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
      [
        new Ingredient('Burger', 1),
        new Ingredient('Cheddar Cheese', 2),
        new Ingredient('Lattice', 1),
        new Ingredient('Onion', 1),
        new Ingredient('Tomato', 1),
      ]
    ),
  ];
*/

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    // return a copy of recipes without direct access
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
