import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDayModalComponent } from './add-day-modal.component';

describe('AddDayModalComponent', () => {
  let component: AddDayModalComponent;
  let fixture: ComponentFixture<AddDayModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDayModalComponent]
    });
    fixture = TestBed.createComponent(AddDayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
