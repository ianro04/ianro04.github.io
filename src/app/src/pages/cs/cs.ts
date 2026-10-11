import { Component, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GithubService, GithubRepo } from '../../services/git-hub/git-hub';

@Component({
  imports: [],
  selector: 'app-cs',
  styleUrl: './cs.less',
  templateUrl: './cs.html',
})
export class CS implements OnInit {
  repos = signal<GithubRepo[]>([]);

  constructor(private GitHub: GithubService) {}

  async ngOnInit(): Promise<void> {
    const resp = await firstValueFrom(this.GitHub.getUserRepos('ianro04'));
    this.repos.set(resp.filter(r => !r.fork));
  }
}
