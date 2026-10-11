import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { GithubService } from '../../services/git-hub/git-hub';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubService],
    });
    service = TestBed.inject(GithubService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
