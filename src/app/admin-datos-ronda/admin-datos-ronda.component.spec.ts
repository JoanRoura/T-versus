import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDatosRondaComponent } from './admin-datos-ronda.component';

describe('AdminDatosRondaComponent', () => {
  let component: AdminDatosRondaComponent;
  let fixture: ComponentFixture<AdminDatosRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDatosRondaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDatosRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
