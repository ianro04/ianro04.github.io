import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/git-hub/git-hub';

@Component({
  imports: [],
  selector: 'app-cs',
  styleUrl: './cs.less',
  templateUrl: './cs.html',
})
export class CS implements OnInit {
  testList: any;

  constructor(private GitHub: GithubService) {}

  async ngOnInit(): Promise<void> {
    let resp = await this.GitHub.getUserRepos('ianro04');
    console.log(resp);
  }
}
