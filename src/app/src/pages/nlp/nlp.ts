import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface HFSpace {
  project: string;
  completionMonth: string;
  space: string;
  description: string;
  extraLinks?: { name: string; url: string }[];
}

type HFSpaceView = HFSpace & { safeSpace: SafeResourceUrl };

@Component({
  imports: [AsyncPipe],
  selector: 'app-nlp',
  styleUrl: './nlp.less',
  templateUrl: './nlp.html',
})
export class NLP implements OnInit {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {}
  listSpaces: Observable<HFSpaceView[]> = of([]);

  ngOnInit() {
    this.listSpaces = this.fetchSpaces().pipe(
      map((spaces) =>
        spaces
          .sort((a, b) =>
            b.completionMonth.localeCompare(a.completionMonth),
          )
          .map((space) => ({
            ...space,
            safeSpace: this.sanitizer.bypassSecurityTrustResourceUrl(
              space.space,
            ),
          })),
      ),
    );
  }

  private fetchSpaces(): Observable<HFSpace[]> {
    return this.http.get<HFSpace[]>('hf_spaces.json');
  }
}
