import { RouterModule, Routes } from "@angular/router";

import { SearchFormComponent } from './search-form/search-form.component';

const routes: Routes = [
  { path: "", component: SearchFormComponent },
  { path: '**', component: SearchFormComponent },
];

export const routing = RouterModule.forRoot(
  routes,
  { enableTracing: false } // <-- debugging purposes only
);
