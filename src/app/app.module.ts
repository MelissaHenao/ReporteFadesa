import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeB24Component } from './components/employee-b24/employee-b24.component';
import { TaskListB24Component } from './components/task-list-b24/task-list-b24.component';
import { CalculatedFieldsComponent } from './components/calculated-fields/calculated-fields.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeB24Component,
    TaskListB24Component,
    CalculatedFieldsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
