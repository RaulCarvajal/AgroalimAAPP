import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaencuestaComponent } from './nuevaencuesta.component';

describe('NuevaencuestaComponent', () => {
  let component: NuevaencuestaComponent;
  let fixture: ComponentFixture<NuevaencuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaencuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
