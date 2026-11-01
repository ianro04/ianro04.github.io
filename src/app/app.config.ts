import { provideTaiga } from '@taiga-ui/core';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpCache, withHttpCacheInterceptor, withLocalStorage } from '@ngneat/cashew';

export const appConfig: ApplicationConfig = {
  providers: [
      provideBrowserGlobalErrorListeners(),
      provideRouter(routes),
      provideClientHydration(),
      provideHttpClient(withInterceptors([withHttpCacheInterceptor()])),
      provideHttpCache(withLocalStorage()),
      provideTaiga(),
  ]
};
