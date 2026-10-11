import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CV } from './cv';
import * as fs from 'fs';
import * as path from 'path';

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

  it('should have access to IR_CV.pdf', () => {
    const cvPath = path.join(process.cwd(), 'public', 'IR_CV.pdf');
    const fileExists = fs.existsSync(cvPath);
    expect(fileExists).toBe(true);
  })
});
