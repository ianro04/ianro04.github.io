import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { CS } from './cs';
import { GithubService } from '../../services/git-hub/git-hub';
import { provideRouter, Router } from '@angular/router';
import * as fs from 'fs';
import * as path from 'path';
import { of } from 'rxjs';

describe('CS', () => {
  let component: CS;
  let fixture: ComponentFixture<CS>;

  const githubServiceMock = {
    getUserRepos: () => of([]),
    getExtraRepos: () => of([]),
    getSpecificRepo: () => of(null),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CS],
      providers: [
        provideRouter([{ path: 'pages/cs', component: CS }]),
        { provide: GithubService, useValue: githubServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have access to misc_repos.json', async () => {
    const miscPath = path.join(process.cwd(), 'public', 'misc_repos.json');
    const fileExists = fs.existsSync(miscPath);
    expect(fileExists).toBe(true);
  });

  it('should filter projects by the query parameter and allow returning to all projects', async () => {
    const harness = await RouterTestingHarness.create();
    const routedComponent = await harness.navigateByUrl('/pages/cs?filter=react', CS);
    routedComponent.repos.set([
      {
        id: 1,
        name: 'React project',
        description: null,
        html_url: 'https://example.com/react',
        language: 'TypeScript',
        fork: false,
        topics: ['react'],
        pushed_at: '2026-01-01',
      },
      {
        id: 2,
        name: 'Other project',
        description: null,
        html_url: 'https://example.com/other',
        language: 'TypeScript',
        fork: false,
        topics: ['angular'],
        pushed_at: '2026-01-01',
      },
    ]);
    harness.detectChanges();

    expect(harness.routeNativeElement?.querySelectorAll('.repo').length).toBe(1);
    expect(harness.routeNativeElement?.querySelector('.filter-controls')?.textContent).toContain('react');

    harness.routeNativeElement?.querySelector('button')?.dispatchEvent(new Event('click'));
    await harness.fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/pages/cs');
  });

  it('should filter for specific languages', async () => {
    const harness = await RouterTestingHarness.create();
    const routedComponent = await harness.navigateByUrl('/pages/cs?filter=python', CS);
    routedComponent.repos.set([
      {
        id: 1,
        name: 'Python language project',
        description: null,
        html_url: 'https://example.com/python',
        language: 'Python',
        fork: false,
        topics: [],
        pushed_at: '2026-01-01',
      },
      {
        id: 2,
        name: 'Python topic project',
        description: null,
        html_url: 'https://example.com/python-topic',
        language: 'JavaScript',
        fork: false,
        topics: ['python'],
        pushed_at: '2026-01-01',
      },
      {
        id: 3,
        name: 'Unrelated project',
        description: null,
        html_url: 'https://example.com/unrelated',
        language: 'JavaScript',
        fork: false,
        topics: ['web'],
        pushed_at: '2026-01-01',
      },
    ]);
    harness.detectChanges();

    expect(harness.routeNativeElement?.querySelectorAll('.repo').length).toBe(2);
  });
});
