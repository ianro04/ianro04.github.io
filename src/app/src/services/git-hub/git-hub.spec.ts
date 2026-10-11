import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubService } from '../../services/git-hub/git-hub';

describe('Github', () => {
  let component: GithubService;
  let fixture: ComponentFixture<GithubService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubService],
    }).compileComponents();

    fixture = TestBed.createComponent(GithubService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
