import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'
import { bootstrapGithub, bootstrapLinkedin } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { TuiSwitch, tuiSwitchOptionsProvider } from '@taiga-ui/kit';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, TuiSwitch, NgIcon],
  providers: [
    tuiSwitchOptionsProvider({
      appearance: (el) => (el.checked ? 'accent' : 'secondary'),
    }),
  ],
  selector: 'app-navbar',
  styleUrl: './navbar.less',
  templateUrl: './navbar.html',
  viewProviders: [provideIcons({bootstrapGithub, bootstrapLinkedin})]
})
export class Navbar {
  protected readonly darkMode = inject(TUI_DARK_MODE);
}
