import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservierungsUebersichtComponent } from './reservierungs-uebersicht.component';

describe('ReservierungsUebersichtComponent', () => {
  let component: ReservierungsUebersichtComponent;
  let fixture: ComponentFixture<ReservierungsUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservierungsUebersichtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservierungsUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
