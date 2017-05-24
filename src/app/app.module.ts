import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BlockUIModule } from 'ng-block-ui';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { TestingComponent } from './testing/testing.component';
import { ProjectinfoComponent } from './projectinfo/projectinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    ProjectinfoComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BlockUIModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
