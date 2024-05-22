import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VorschlagComponent } from './vorschlag.component';

describe('VorschlagComponent', () => {
  let component: VorschlagComponent;
  let fixture: ComponentFixture<VorschlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VorschlagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VorschlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
