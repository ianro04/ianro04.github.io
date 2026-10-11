import { Component, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GithubService, GithubRepo } from '../../services/git-hub/git-hub';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-cs',
  styleUrl: './cs.less',
  templateUrl: './cs.html',
})
export class CS implements OnInit {
  repos = signal<GithubRepo[]>([]);

  constructor(private GitHub: GithubService) {}

  private formatRepoList(startList: GithubRepo[]) {
    return startList
    .filter(r => !r.fork)
    .map(r => ({ ...r, topics: r.topics?.length ? r.topics : ['None'] }))
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)); // Most recently updated first
  }

  async ngOnInit(): Promise<void> {
    const resp = await firstValueFrom(this.GitHub.getUserRepos('ianro04'));
    this.repos.set(this.formatRepoList(resp));
    const respExtras = await firstValueFrom(this.GitHub.getExtraRepos());
    const settledExtraRepos = await Promise.allSettled(
      respExtras.map(e => firstValueFrom(this.GitHub.getSpecificRepo(e.owner, e.repo)))
    );
    const extraRepos = settledExtraRepos
      .filter((r): r is PromiseFulfilledResult<GithubRepo> => r.status === 'fulfilled')
      .map(r => r.value);
    this.repos.update(current => this.formatRepoList([...current, ...extraRepos]));
  }
}
