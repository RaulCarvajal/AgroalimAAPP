import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestadialogComponent } from './encuestadialog.component';

describe('EncuestadialogComponent', () => {
  let component: EncuestadialogComponent;
  let fixture: ComponentFixture<EncuestadialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestadialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
