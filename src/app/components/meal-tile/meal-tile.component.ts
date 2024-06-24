import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { IngredientListComponent } from '../ingredient-list/ingredient-list.component';
import {
  MealInterface,
  NewMealIngredient,
} from '../../models/meal.interface';
import { CommonModule } from '@angular/common';
import { NutriListComponent } from '../nutri-list/nutri-list.component';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { HttpService } from '../../services/http.service';
import { Observable } from 'rxjs';
import { FoodInterface } from '../../models/food.interface';
import { FindingFoodsService } from '../../services/finding-foods.service';

@Component({
  selector: 'app-meal-tile',
  templateUrl: './meal-tile.component.html',
  styleUrls: ['./meal-tile.component.scss'],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    SearchBarComponent,
    IngredientListComponent,
    CommonModule,
    NutriListComponent,
  ],
  standalone: true,
})
export class MealTileComponent {
  mealTotalNeutrinos: any = {};
  @Input({ required: false }) meal!: MealInterface;
  @Input({ required: true }) index: number = 0;
  @Output() mealIngredient: EventEmitter<NewMealIngredient> =
    new EventEmitter<NewMealIngredient>();
  foodsList$!: Observable<FoodInterface[]>;
  step = 0;

  constructor(
    public dialog: Dialog,
    private readonly httpService: HttpService,
    private readonly findingFoodsService: FindingFoodsService
  ) {}

  ngOnInit(): void {
    this.foodsList$ = this.httpService.getFoodsFromJSON();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  /**
   *
   */
  onOpenDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      height: '250px',
      data: {},
    });

    dialogRef.closed.subscribe((result: any) => {
      console.log(result);
    });
  }

  /**
   *
   */
  addFoodToMeal(food: FoodInterface): void {
    this.mealIngredient.emit({
      foodId: food.id,
      foodName: food.name,
      mealId: this.meal.id,
    });
  }
}
