import { Component, computed, inject } from '@angular/core';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  imports: [NgxExtendedPdfViewerModule],
  selector: 'app-cv',
  templateUrl: './cv.html',
  styles: `
    :host {
      display: block;
      flex: 1;
      background-color: var(--app-page-bg);
    }
  `
})
export class CV {
  private readonly darkMode = inject(TUI_DARK_MODE);
  protected readonly viewerTheme = computed(() =>
    this.darkMode() ? 'dark' : 'light',
  );
  protected readonly viewerBackground = computed(() =>
    this.darkMode() ? '#141a22' : '#f3f5f7',
  );
}
