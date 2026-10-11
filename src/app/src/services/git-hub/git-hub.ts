import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUserProfile(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${username}`);
  }

  getUserRepos(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/${username}/repos`);
  }
  
}
