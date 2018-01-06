import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { routing } from "./app.routing";
import { PagerService } from './_services';


@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    PagerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
