import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nutri-list',
  templateUrl: './nutri-list.component.html',
  styleUrls: ['./nutri-list.component.scss'],
  standalone: true  
})
export class NutriListComponent {
@Input() mealTotalNeutrinos:any;
}
