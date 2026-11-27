import { ChangeDetectionStrategy, Component, computed, DestroyRef, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TuiAppearance, TuiTitle } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import { TuiCardMedium } from '@taiga-ui/layout';

import { GithubRepo, GithubService } from '../../services/git-hub/git-hub';

type DisplayGithubRepo = Omit<GithubRepo, 'topics'> & { topics: string[] };

@Component({
  imports: [RouterLink, TuiAppearance, TuiBadge, TuiCardMedium, TuiTitle],
  selector: 'app-cs',
  styleUrl: './cs.less',
  templateUrl: './cs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CS implements OnInit {
  repos = signal<DisplayGithubRepo[]>([]);
  private filter = signal<string | null>(null);
  activeFilter = computed(() => this.filter()?.trim().toLowerCase() || null);
  filteredRepos = computed(() => {
    const filter = this.activeFilter();
    const repos = this.repos();
    if (!filter) {
      return repos;
    }

    return repos.filter(repo => {
      const language = repo.language?.toLowerCase() ?? '';
      return language === filter
        || (filter === 'python' && language === 'jupyter notebook')
        || repo.topics.some(topic => topic.toLowerCase() === filter);
    });
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

  private formatRepoList(startList: GithubRepo[]): DisplayGithubRepo[] {
    return startList
      .filter(repo => !repo.fork)
      .map(repo => ({
        ...repo,
        topics: repo.topics?.length ? repo.topics : ['No Topics Listed'],
      }))
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));
  }

  async ngOnInit(): Promise<void> {
    const resp = await firstValueFrom(this.GitHub.getUserRepos('ianro04'));
    this.repos.set(this.formatRepoList(resp));

    const respExtras = await firstValueFrom(this.GitHub.getExtraRepos());
    const settledExtraRepos = await Promise.allSettled(
      respExtras.map(async extraRepo => {
        const repo = await firstValueFrom(
          this.GitHub.getSpecificRepo(extraRepo.owner, extraRepo.repo)
        );
        if (extraRepo.extraTopics?.length) {
          repo.topics = [...new Set([...(repo.topics ?? []), ...extraRepo.extraTopics])];
        }
        return repo;
      })
    );
    const extraRepos = settledExtraRepos
      .filter((result): result is PromiseFulfilledResult<GithubRepo> => result.status === 'fulfilled')
      .map(result => result.value);

    this.repos.update(current => this.formatRepoList([...current, ...extraRepos]));
  }
}
