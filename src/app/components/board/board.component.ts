import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MealTileComponent } from './../meal-tile/meal-tile.component';
import {
  MealDayInterface,
  MealInterface,
  NewMealIngredient,
} from '../../models/meal.interface';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { Dialog } from '@angular/cdk/dialog';
import { NutriListComponent } from '../nutri-list/nutri-list.component';
import { AddDayModalComponent } from '../add-day-modal/add-day-modal.component';
import { FindingFoodsService } from '../../services/finding-foods.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  imports: [
    MatButtonModule,
    MealTileComponent,
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NutriListComponent,
  ],
  styleUrls: ['./board.component.scss'],
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  mealDay!: MealDayInterface;

  constructor(public dialog: Dialog, private findingFoodsService: FindingFoodsService) {}

  /**
   *
   */
  onAddNewMealToDay(): void {
    this.mealDay.meals.push({
      name: `Meal ${this.mealDay.meals.length + 1}`,
      id: `${this.mealDay.meals.length + 1}`,
      date: new Date(),
      ingredients: [],
    });
  }

  /**
   * opens dialog  dialog
   */
  onAddNewDay(): void {
    const dialogRef = this.dialog.open(AddDayModalComponent, {
      width: '350px',
      height: '500px',
      data: {},
    });

    dialogRef.closed.subscribe((result: any) => {
      this.createNewMealDay(result);
    });
  }

  /**
   * This is the day tile where the meals are inserted
   */
  createNewMealDay(date: Date): void {
    this.mealDay = {
      id: '123',
      date: date.toString(),
      meals: [],
    };

    this.mealDay = { ...this.mealDay };
  }

  /**
   * TODO: If ingredient is already in the meal ingredient list don't add.
   * @param newMealIngredient
   */
  addIngredientToMeal(pickedFood: NewMealIngredient): void {
    //Create new ingredient object
    const newIngredient = {
      name: pickedFood.foodName,
      id: pickedFood.foodId,
      quantity: 100,
    };

    //Find by id the meal index
    const mealIndex = this.mealDay.meals.findIndex(
      (meal: MealInterface) => meal.id === pickedFood.mealId
    );

    //Update the meal ingredient list
    const mealToEdit = this.mealDay.meals[mealIndex];

    // If ingredient already exists in meal return empty
    for (let ing of mealToEdit.ingredients) {
      if (ing.id === newIngredient.id) {
        return;
      }
    }

    //Add ingredient to meal ingredient list
    mealToEdit.ingredients.push(newIngredient);

    //Updating the total nutrition list of the meal 
    mealToEdit.mealTotalNutrition =
    this.findingFoodsService.calculateNutritionForMeal(mealToEdit.ingredients);

    //Update meal in meal list
    this.mealDay.meals[mealIndex] = mealToEdit;    
  }

  /**
   *
   * @param index
   * @returns
   */
  identify(index: number): number {
    return index;
  }
}
