import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';
import { By } from '@angular/platform-browser';
import { CV } from './cv';
import * as fs from 'fs';
import * as path from 'path';

describe('CV', () => {
  let component: CV;
  let fixture: ComponentFixture<CV>;
  let darkMode: WritableSignal<boolean>;

  beforeEach(async () => {
    darkMode = signal(false);

    await TestBed.configureTestingModule({
      imports: [CV],
      providers: [{ provide: TUI_DARK_MODE, useValue: darkMode }],
    }).compileComponents();

    fixture = TestBed.createComponent(CV);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have access to IR_CV.pdf', () => {
    const cvPath = path.join(process.cwd(), 'public', 'IR_CV.pdf');
    const fileExists = fs.existsSync(cvPath);
    expect(fileExists).toBe(true);
  });

  it('should update the PDF viewer theme with dark mode', () => {
    const viewer = fixture.debugElement.query(
      By.directive(NgxExtendedPdfViewerComponent),
    ).componentInstance as NgxExtendedPdfViewerComponent;

    expect(viewer.theme()).toBe('light');
    expect(viewer.backgroundColor()).toBe('#f3f5f7');

    darkMode.set(true);
    fixture.detectChanges();

    expect(viewer.theme()).toBe('dark');
    expect(viewer.backgroundColor()).toBe('#141a22');
  });
});
