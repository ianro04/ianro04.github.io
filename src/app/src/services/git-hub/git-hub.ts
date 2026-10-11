import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  fork: boolean;
  topics?: string[];
  pushed_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUserRepos(username: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(`${this.baseUrl}/users/${username}/repos`, { params: { per_page : 100, sort: 'updated' }});
  }

  getUserLanguages(owner: string, repo: string): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/repos/${owner}/${repo}/languages`)
  };
}
