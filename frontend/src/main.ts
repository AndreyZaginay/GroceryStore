import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideFirestore } from "@angular/fire/firestore";
import { getFirestore } from "firebase/firestore";
import { importProvidersFrom } from "@angular/core";

import appRouting from "./app/app-routing";
import { firebaseConfig } from "./environments/firebaseConfig";
import { AppComponent } from "./app/app.component";


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(appRouting),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
    ]),
  ]
});
