import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NLP } from './nlp';

describe('NLP', () => {
  let component: NLP;
  let fixture: ComponentFixture<NLP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NLP],
    }).compileComponents();

    fixture = TestBed.createComponent(NLP);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
