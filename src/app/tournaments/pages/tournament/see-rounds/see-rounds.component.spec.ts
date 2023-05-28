import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeRoundsComponent } from './see-rounds.component';

describe('SeeRoundsComponent', () => {
  let component: SeeRoundsComponent;
  let fixture: ComponentFixture<SeeRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeRoundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
