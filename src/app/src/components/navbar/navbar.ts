import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { TuiSwitch, tuiSwitchOptionsProvider } from '@taiga-ui/kit';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, TuiSwitch],
  providers: [
    tuiSwitchOptionsProvider({
      appearance: (el) => (el.checked ? 'accent' : 'secondary'),
    }),
  ],
  selector: 'app-navbar',
  styleUrl: './navbar.less',
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly darkMode = inject(TUI_DARK_MODE);
}
