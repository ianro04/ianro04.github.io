import { DOCUMENT } from '@angular/common';
import {
  ApplicationConfig,
  inject,
  mergeApplicationConfig,
  provideEnvironmentInitializer,
} from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideEnvironmentInitializer(() => {
      const view = inject(DOCUMENT).defaultView;

      if (!view) {
        throw new Error('Window is not available during server rendering.');
      }

      if (typeof view.matchMedia !== 'function') {
        Object.defineProperty(view, 'matchMedia', {
          configurable: true,
          value: (media: string): MediaQueryList => ({
            matches: false,
            media,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
          }),
        });
      }
    }),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
