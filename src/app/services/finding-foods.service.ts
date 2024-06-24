import { Injectable } from '@angular/core';
import { FoodInterface } from '../models/food.interface';
import { MealIngredientInterface } from '../models/meal.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class FindingFoodsService {
  foodsList!: FoodInterface[];
  nutritionModel = {
    kcal: 0,
    watter: 0,
    proteinTotal: 0,
    proteinAnimal: 0,
    proteinPlant: 0,
    fat: 0,
    carbs: 0,
    cholesterol: 0,
    glycemicIndex: 'xxx',
    saccharose: 0,
    lactose: 0,
    starch: 0,
    fiber: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    phosphorus: 0,
    magnesium: 0,
    iron: 0,
    zinc: 0,
    copper: 0,
    manganese: 0,
    retinolA: 0,
    betaKaroten: 0,
    D: 0,
    E: 0,
    thiamineB1: 0,
    riboflavinB2: 0,
    niacinB3: 0,
    B6: 0,
    foliansB9: 0,
    B1: 0,
    C: 0,
  };

  constructor(private httpService: HttpService) {
    this.httpService.getFoodsFromJSON().subscribe((data: FoodInterface[]) => {
      this.foodsList = data;
    });
  }

  /**
   * Calculate nutrition of a meal
   * Neutrinos are for 100g/ml
   */
  calculateNutritionForMeal(mealIngredients: MealIngredientInterface[]): any {
    let mealFoods: FoodInterface[] = [];
    const foodsList: FoodInterface[] = [...this.foodsList];

    // Calculating (nutrition * quantity) for every ingredient food on the list
    for (let ingredient of mealIngredients) {
      const quantity = ingredient.quantity / 100;
      let foodById: FoodInterface | null = null;

      for (let food of foodsList) {
        if (food.id === ingredient.id) {
          foodById = food;
        }
      }

      if (foodById) {
        for (let key in foodById) {
          if (key !== 'id' && key !== 'name') {
            foodById[key as keyof typeof foodById] = (
              Number(foodById[key as keyof typeof foodById]) * quantity
            ).toString();
          }
        }
        mealFoods.push(foodById);
      }
    }

    //Sum all nutations
    if (mealFoods.length !== 0) {
      let sumObject: any = {};

      for (let food of mealFoods) {
        // Second loop over each key in the current object
        for (let key in food) {
          if (key !== 'id' && key !== 'name') {
            if (sumObject[key] === (null || undefined)) {
              sumObject[key] = 0;
            }
            // Add the current object's value to the sumObject's value
            sumObject[key] =
              sumObject[key] + Number(food[key as keyof typeof food]);
          }
        }
      }
      return sumObject;
    }

    return { ...this.nutritionModel };
  }
}
