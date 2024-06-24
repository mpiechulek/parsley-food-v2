import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriListComponent } from './nutri-list.component';

describe('NutriListComponent', () => {
  let component: NutriListComponent;
  let fixture: ComponentFixture<NutriListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutriListComponent]
    });
    fixture = TestBed.createComponent(NutriListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
