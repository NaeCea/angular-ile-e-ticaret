import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';

registerLocaleData  (localeTr, 'tr');  

export const appConfig: ApplicationConfig = {
  providers: [
   provideBrowserGlobalErrorListeners(),
   provideZonelessChangeDetection(),
   provideHttpClient(),
   provideNgxMask(),
    provideRouter(appRoutes),
    {
      provide: LOCALE_ID,
      useValue: 'tr',
    }
  ],
};
