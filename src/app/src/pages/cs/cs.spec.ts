import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CS } from './cs';

describe('CS', () => {
  let component: CS;
  let fixture: ComponentFixture<CS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CS],
    }).compileComponents();

    fixture = TestBed.createComponent(CS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
