import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { withCache } from '@ngneat/cashew';

const HOUR = 60 * 60 * 1000;

const cached = () =>
  withCache({ ttl: HOUR, storage: 'localStorage', version: 'v1' });

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  fork: boolean;
  topics?: string | string[];
  pushed_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUserRepos(username: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(`${this.baseUrl}/users/${username}/repos`, {
      params: { per_page : 100, sort: 'updated' }, context: cached()
    });
  }

  getUserLanguages(owner: string, repo: string): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/repos/${owner}/${repo}/languages`,
      { context: cached() }
    );
  }

  getSpecificRepo(owner: string, repo: string): Observable<GithubRepo> {
    return this.http.get<GithubRepo>(`${this.baseUrl}/repos/${owner}/${repo}`, { context: cached() });
  }

  getExtraRepos(): Observable<{owner: string, repo: string}[]> { // Repos I worked on that don't fall under my profile
    return this.http.get<{ owner: string, repo: string }[]>('misc_repos.json');
  }
}
