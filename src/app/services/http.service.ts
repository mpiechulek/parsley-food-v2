import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodInterface } from '../models/food.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private foods: FoodInterface[] = [];

  constructor(private http: HttpClient) {   
  }


  /**
   * 
   */
  getFindFood() {
    this.http.get('');
  }

  /**
   * 
   */
  postMeals() {
    this.http.post('', {});
  }

  /**
   * Get foods data from json file
   * @returns
   */
  getFoodsFromJSON(): Observable<FoodInterface[]> {
    return this.http.get<FoodInterface[]>('./assets/data/foods.json');
  }
}
