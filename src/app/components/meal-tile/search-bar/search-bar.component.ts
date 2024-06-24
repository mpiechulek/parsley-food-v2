import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { NgFor, AsyncPipe, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FoodInterface } from '../../../models/food.interface';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    MatButtonModule,
    MatCheckboxModule,
    NgIf,
  ],
})
export class SearchBarComponent implements OnInit {
  myControl!: FormGroup;
  checked: boolean = false;
  showError: boolean = false;
  foodList!: FoodInterface[];
  filteredOptions!: Observable<FoodInterface[]>;
  @Output() foodName = new EventEmitter<FoodInterface>();
  @Input() foodList$!: Observable<FoodInterface[]>;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.foodList$.pipe(take(1)).subscribe((data: FoodInterface[]) => {
      this.foodList = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return this.filterInput(value.inputValue || '');
        })
      );
    });

    this.myControl = this.formBuilder.group({
      inputValue: [''],
    });
  }

  /**
   *
   */
  onSubmitSearch(): void {
    const value = this.myControl.get('inputValue')?.value;
    const foodType = this.findPickedFoodInFoodList(value);
    if (foodType.id) {
      this.showError = false;
      this.foodName.emit(foodType);
      this.myControl.get('inputValue')?.setValue('');
    } else {
      this.showError = true;
    }
  }

  /**
   *
   * @param value
   * @returns
   */
  private filterInput(value: string): FoodInterface[] {
    const filterValue = value.toLowerCase();
    return this.foodList.filter((food: FoodInterface) =>
      food.name.toLowerCase().includes(filterValue)
    );
  }

  /**
   *
   */
  private findPickedFoodInFoodList(value: string): FoodInterface {
    let isFoodOnList: FoodInterface = {} as FoodInterface;
    this.foodList.find((food: FoodInterface) => {
      if (food.name === value) isFoodOnList = food;
    });
    return isFoodOnList;
  }
}
