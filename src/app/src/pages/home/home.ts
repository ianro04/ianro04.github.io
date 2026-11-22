import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import WordCloudData from '../../../../../public/word_cloud.json';

interface WordCloudItem {
  topic: string;
  isCS: boolean;
  link?: string;
  queryParams?: Record<string, string>;
}

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.less',
  templateUrl: './home.html',
})
export class Home {
  wordCloud: WordCloudItem[] = WordCloudData;
  wordCloudLength: number = this.wordCloud.length;
  currentRotation: number = 54;

  rotateTo(index: number): void {
    this.currentRotation = (54 + ((index + 1) * 360) / this.wordCloudLength) % 360;
  }

  isExternalLink(link: string): boolean {
    return /^https?:\/\//.test(link);
  }
}
