import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";

import appRouting from "./app/app-routing";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRouting)
  ]
})