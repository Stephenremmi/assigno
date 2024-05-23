import { Routes } from "@angular/router";

import { ContactmanagerAppComponent } from "./contactmanager-app.component";
import { MainContentComponent } from "./components/main-content/main-content.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SchoolComponent } from "./components/school/school.component";

export const CONTACTMANAGER_ROUTES: Routes = [
  {
    path: '', component: ContactmanagerAppComponent,
    children: [
      { path: '', component: MainContentComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'school', component: SchoolComponent },
      { path: ':id', component: MainContentComponent }
    ]
  }
];