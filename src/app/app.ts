import { TuiRoot } from '@taiga-ui/core';
import { ApplicationConfig } from '@angular/core';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './src/components/navbar/navbar';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};

@Component({
  imports: [Navbar, RouterOutlet, TuiRoot],
  selector: 'app-root',
  styleUrl: './app.less',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('IR-Portfolio');
}
