import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMediumComponent } from './add-medium.component';

describe('AddMediumComponent', () => {
  let component: AddMediumComponent;
  let fixture: ComponentFixture<AddMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMediumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
