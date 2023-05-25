import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTournamentRondesComponent } from './admin-tournament-rondes.component';

describe('AdminTournamentRondesComponent', () => {
  let component: AdminTournamentRondesComponent;
  let fixture: ComponentFixture<AdminTournamentRondesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTournamentRondesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTournamentRondesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
