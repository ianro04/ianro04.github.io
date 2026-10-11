import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
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
      'Software & Data Science Projects',
      'NLP Projects',
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
});
