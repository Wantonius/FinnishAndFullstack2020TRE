import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Conditional } from './conditional.component';
import {ContactList} from './contactlist.component';
@NgModule({
  declarations: [
    AppComponent,
	Conditional,
	ContactList
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
