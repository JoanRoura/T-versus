import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponenteRondaComponent } from './admin-componente-ronda.component';

describe('AdminComponenteRondaComponent', () => {
  let component: AdminComponenteRondaComponent;
  let fixture: ComponentFixture<AdminComponenteRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponenteRondaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponenteRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
