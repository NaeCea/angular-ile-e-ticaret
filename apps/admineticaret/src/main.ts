import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import  App  from './app';
import { registerLocaleData } from '@angular/common';


bootstrapApplication(App, appConfig).catch((err) => console.error(err));
