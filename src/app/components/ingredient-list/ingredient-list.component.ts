import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MealIngredientInterface } from '../../models/meal.interface';
import { MatIconModule } from '@angular/material/icon';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    DialogModule,
    ConfirmationModalComponent,
  ],
  standalone: true,
})
export class IngredientListComponent {
  @Input({ required: true }) ingredients!: MealIngredientInterface[];

  constructor(public dialog: Dialog) {}

  identify(index: number): number {
    return index;
  }

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
}
