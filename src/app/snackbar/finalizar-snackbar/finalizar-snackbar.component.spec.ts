import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarSnackbarComponent } from './finalizar-snackbar.component';

describe('FinalizarSnackbarComponent', () => {
  let component: FinalizarSnackbarComponent;
  let fixture: ComponentFixture<FinalizarSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizarSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
