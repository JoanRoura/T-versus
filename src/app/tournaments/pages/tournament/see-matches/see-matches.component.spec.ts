import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMatchesComponent } from './see-matches.component';

describe('SeeMatchesComponent', () => {
  let component: SeeMatchesComponent;
  let fixture: ComponentFixture<SeeMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeMatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
