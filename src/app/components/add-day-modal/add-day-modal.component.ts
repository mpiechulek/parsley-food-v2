import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-add-day-modal',
  templateUrl: './add-day-modal.component.html',
  styleUrls: ['./add-day-modal.component.scss'],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
  ],
  standalone: true,
})
export class AddDayModalComponent {
  showPastDate = false;
  today = new Date();
  
  constructor(
    public dialogRef: DialogRef<Date>,
    @Inject(DIALOG_DATA) public data: undefined
  ) {}

  /**
   * Adding a new day of meals
   */
  onAddMealDay(): void {
    this.dialogRef.close(this.today);
  }
}
