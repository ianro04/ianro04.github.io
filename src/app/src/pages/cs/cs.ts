import { ChangeDetectionStrategy, Component, computed, DestroyRef, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GithubService, GithubRepo } from '../../services/git-hub/git-hub';
import { RouterLink } from '@angular/router';

import { TuiAppearance, TuiTitle } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import { TuiCardMedium } from '@taiga-ui/layout';

@Component({
  imports: [RouterLink, TuiAppearance, TuiBadge, TuiCardMedium, TuiTitle],
  selector: 'app-cs',
  styleUrl: './cs.less',
  templateUrl: './cs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CS implements OnInit {
  repos = signal<GithubRepo[]>([]);
  private filter = signal<string | null>(null);
  activeFilter = computed(() => this.filter()?.trim().toLowerCase() || null);
  filteredRepos = computed(() => {
    const filter = this.activeFilter();
    if (!filter) {
      return this.repos();
    }

    return this.repos().filter(repo =>
      Array.isArray(repo.topics) && repo.topics.some(topic => topic.toLowerCase() === filter)
    );
  });

  constructor(
    private GitHub: GithubService,
    private route: ActivatedRoute,
    private router: Router,
    destroyRef: DestroyRef
  ) {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(params => this.filter.set(params.get('filter')));
  }

  clearFilter(): Promise<boolean> {
    return this.router.navigateByUrl('/pages/cs');
  }

  private formatRepoList(startList: GithubRepo[]) {
    return startList
    .filter(r => !r.fork)
    .map(r => ({ ...r, topics: r.topics?.length ? (Array.isArray(r.topics) ? r.topics : Array.from(r.topics)) : ['No Topics Listed'] }))
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)); // Most recently updated first
  }

  async ngOnInit(): Promise<void> {
    const resp = await firstValueFrom(this.GitHub.getUserRepos('ianro04'));
    this.repos.set(this.formatRepoList(resp));
    const respExtras = await firstValueFrom(this.GitHub.getExtraRepos());
    const settledExtraRepos = await Promise.allSettled(
      respExtras.map(async e => {
        const repo = await firstValueFrom(this.GitHub.getSpecificRepo(e.owner, e.repo));
        const extraTopics = (e as typeof e & { extraTopics?: string[] }).extraTopics;
        if (extraTopics) {
          repo.topics = repo.topics ? [...repo.topics, ...extraTopics] : extraTopics;
        }
        return repo;
      })
    );
    const extraRepos = settledExtraRepos
      .filter((r): r is PromiseFulfilledResult<GithubRepo> => r.status === 'fulfilled')
      .map(r => r.value);
    this.repos.update(current => this.formatRepoList([...current, ...extraRepos]));
  }
}
