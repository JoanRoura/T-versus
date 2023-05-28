import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponenteMatchComponent } from './admin-componente-match.component';

describe('AdminComponenteMatchComponent', () => {
  let component: AdminComponenteMatchComponent;
  let fixture: ComponentFixture<AdminComponenteMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponenteMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponenteMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
