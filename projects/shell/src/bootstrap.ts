import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
    .then(() => {
        (window as any).__GROWUP_TAILWIND_LOADED = true;
    })
    .catch((err) => console.error(err));
