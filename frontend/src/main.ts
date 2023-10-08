import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";

import appRouting from "./app/app-routing";
import { AppComponent } from "./app/app.component";
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './app/core/reducers';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(appRouting),
    provideStore(reducers, { metaReducers })
]
});
