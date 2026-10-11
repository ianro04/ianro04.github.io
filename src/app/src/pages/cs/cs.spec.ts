import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CS } from './cs';
import { GithubService } from '../../services/git-hub/git-hub';
import { provideRouter } from '@angular/router';
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
        provideRouter([]),
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
});
