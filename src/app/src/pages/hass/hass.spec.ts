import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HASS } from './hass';

describe('HASS', () => {
  let component: HASS;
  let fixture: ComponentFixture<HASS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HASS],
    }).compileComponents();

    fixture = TestBed.createComponent(HASS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
