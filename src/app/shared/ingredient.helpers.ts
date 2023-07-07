import { Ingredient } from './ingredient.model';

export const sortAndGroupIngredients: Function = (
  ingredients: Ingredient[]
): Ingredient[] => {
  let groupedIngredients: Ingredient[] = [];

  new Set<string>(ingredients.map((i: Ingredient) => i.name).sort()).forEach(
    (name: string) => {
      let amount: number = 0;
      ingredients.forEach((i: Ingredient) => {
        if (i.name === name) {
          amount += i.amount;
        }
      });
      groupedIngredients.push(new Ingredient(name, amount));
    }
  );
  return groupedIngredients;
};
