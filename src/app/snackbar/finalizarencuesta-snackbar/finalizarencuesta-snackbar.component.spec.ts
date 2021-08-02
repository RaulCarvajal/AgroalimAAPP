import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarencuestaSnackbarComponent } from './finalizarencuesta-snackbar.component';

describe('FinalizarencuestaSnackbarComponent', () => {
  let component: FinalizarencuestaSnackbarComponent;
  let fixture: ComponentFixture<FinalizarencuestaSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizarencuestaSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarencuestaSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
