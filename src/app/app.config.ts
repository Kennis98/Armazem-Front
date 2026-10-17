import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { mockApiInterceptor } from './mock/mock-api.interceptor';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors(environment.useMock ? [mockApiInterceptor] : [])),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
};
