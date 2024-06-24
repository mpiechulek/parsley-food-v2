export interface MealInterface {
  name: string;
  id: string;
  date: string | Date;
  mealTotalNutrition?: any;
  ingredients: MealIngredientInterface[];
}

export interface MealIngredientInterface {
  id: string;
  name: string;
  quantity: number;
}

export interface MealDayInterface {
  id: string;
  date: string;
  meals: MealInterface[];
}

export interface NewMealIngredient {
  foodId: string;
  foodName: string;
  mealId: string;
}
