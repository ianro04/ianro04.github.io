import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NLP } from './nlp';
import { HttpClient } from '@angular/common/http';
import * as fs from 'fs';
import * as path from 'path';
import { of } from 'rxjs';

describe('NLP', () => {
  let component: NLP;
  let fixture: ComponentFixture<NLP>;

  const mockSpaces = [
    {
      project: 'Test Space',
      completionMonth: '2026-05',
      space: 'https://example.hf.space',
      description: 'A test demo',
      extraLinks: [{ name: 'GitHub', url: 'https://github.com/example/test' }],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NLP],
      providers: [
        { provide: HttpClient, useValue: { get: () => of(mockSpaces) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NLP);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have access to hf_spaces.json', async () => {
    const miscPath = path.join(process.cwd(), 'public', 'hf_spaces.json');
    const fileExists = fs.existsSync(miscPath);
    expect(fileExists).toBe(true);
  });

  it('should render configured Spaces with their links and demos', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('h2')?.textContent).toContain('Test Space');
    expect(element.querySelector('a')?.getAttribute('href')).toBe(
      'https://github.com/example/test',
    );
    expect(element.querySelector('iframe')?.getAttribute('src')).toBe(
      'https://example.hf.space',
    );
  });
});
