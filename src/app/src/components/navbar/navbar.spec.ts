import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTaiga, TUI_DARK_MODE } from '@taiga-ui/core';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let darkMode: WritableSignal<boolean>;

  beforeEach(async () => {
    darkMode = signal(false);

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([]),
        provideTaiga(),
        { provide: TUI_DARK_MODE, useValue: darkMode },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links for every page', () => {
    const links = fixture.nativeElement.querySelectorAll('.nav-links a');

    expect(Array.from(links, (link: HTMLAnchorElement) => link.textContent?.trim())).toEqual([
      'Home',
      'CV',
      'Software Projects',
      'NLP & Data Science Projects',
    ]);
  });

  it('should render accessible social links', () => {
    const links = fixture.nativeElement.querySelectorAll('.social-links a');

    expect(Array.from(links, (link: HTMLAnchorElement) => link.href)).toEqual([
      'https://github.com/ianro04',
      'https://www.linkedin.com/in/ian-rodriguez-2646802a5/',
    ]);
    expect(Array.from(links, (link: HTMLAnchorElement) => link.getAttribute('aria-label'))).toEqual([
      'Visit my GitHub',
      'Connect on LinkedIn',
    ]);
  });

  it('should have a functional dark mode toggle', () => {
    const darkModeSwitch: HTMLInputElement = fixture.nativeElement.querySelector(
      '.ui-mode-switch input',
    );

    expect(darkModeSwitch).toBeTruthy();
    expect(darkModeSwitch.checked).toBe(false);

    darkModeSwitch.click();
    fixture.detectChanges();

    expect(darkMode()).toBe(true);
    expect(darkModeSwitch.checked).toBe(true);
  });
});
