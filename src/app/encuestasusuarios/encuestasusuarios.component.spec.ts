import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestasusuariosComponent } from './encuestasusuarios.component';

describe('EncuestasusuariosComponent', () => {
  let component: EncuestasusuariosComponent;
  let fixture: ComponentFixture<EncuestasusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestasusuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestasusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
