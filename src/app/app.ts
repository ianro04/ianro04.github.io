import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './src/components/navbar/navbar';

@Component({
  imports: [Navbar, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.less',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('IR-Portfolio');
}
