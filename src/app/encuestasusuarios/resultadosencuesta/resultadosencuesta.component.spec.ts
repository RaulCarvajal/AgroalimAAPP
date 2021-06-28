import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosencuestaComponent } from './resultadosencuesta.component';

describe('ResultadosencuestaComponent', () => {
  let component: ResultadosencuestaComponent;
  let fixture: ComponentFixture<ResultadosencuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosencuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
