import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CV } from './cv';

describe('CV', () => {
  let component: CV;
  let fixture: ComponentFixture<CV>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CV],
    }).compileComponents();

    fixture = TestBed.createComponent(CV);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
