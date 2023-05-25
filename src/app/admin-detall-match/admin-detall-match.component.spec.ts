import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetallMatchComponent } from './admin-detall-match.component';

describe('AdminDetallMatchComponent', () => {
  let component: AdminDetallMatchComponent;
  let fixture: ComponentFixture<AdminDetallMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetallMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetallMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
