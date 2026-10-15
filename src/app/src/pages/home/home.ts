import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.less',
  templateUrl: './home.html',
})
export class Home {
  wordCloud: {topic: string, isCS: boolean}[] = [
    {topic: 'Natural Language Processing', isCS: true},
    {topic: 'Data Science', isCS: true},
    {topic: 'Software Development', isCS: true},
    {topic: 'C++', isCS: true},
    {topic: 'Python', isCS: true},
    {topic: 'JavaScript', isCS: true},
    {topic: 'TypeScript', isCS: true},
    {topic: 'React', isCS: true},
    {topic: 'Angular', isCS: true},
    {topic: 'GitHub Actions', isCS: true},
    {topic: 'Technical Writing', isCS: false},
    {topic: 'Art History', isCS: false},
    {topic: 'Linguistics', isCS: false},
    {topic: 'AWS', isCS: true}
  ];
  wordCloudLength: number = this.wordCloud.length;
  currentRotation: number = 54;

  rotateTo(index: number): void {
    this.currentRotation = (54 + ((index + 1) * 360) / this.wordCloudLength) % 360;
  }
}