import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  imports: [NgxExtendedPdfViewerModule],
  selector: 'app-cv',
  styleUrl: './cv.less',
  templateUrl: './cv.html',
})
export class CV {}
