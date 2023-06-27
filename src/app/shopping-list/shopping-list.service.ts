//import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  //  ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  private ingredients: Ingredient[] = [];

  private sortAndGroupIngredients(): void {
    let groupedIngredients: Ingredient[] = [];

    new Set(this.ingredients.map((i: Ingredient) => i.name).sort()).forEach(
      (name: string) => {
        let amount: number = 0;
        this.ingredients.forEach((i: Ingredient) => {
          if (i.name === name) {
            console.log(typeof i.amount);
            amount += i.amount;
          }
        });
        groupedIngredients.push(new Ingredient(name, amount));
      }
    );
    this.ingredients = [...groupedIngredients];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.sortAndGroupIngredients();
    //this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.sortAndGroupIngredients();
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.sortAndGroupIngredients();
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.sortAndGroupIngredients();
    //this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }
}
