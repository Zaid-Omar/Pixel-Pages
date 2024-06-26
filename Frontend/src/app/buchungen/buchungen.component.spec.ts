import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuchungenComponent } from './buchungen.component';

describe('BuchungenComponent', () => {
  let component: BuchungenComponent;
  let fixture: ComponentFixture<BuchungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuchungenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuchungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
