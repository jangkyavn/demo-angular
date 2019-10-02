import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import us from '@angular/common/locales/en';

registerLocaleData(us);

import { AppRoutingModule } from './app.routing';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';

import { BreadcrumbComponent } from '@component/breadcrumb/breadcrumb.component';

const APP_CONTAINERS = [
   AppComponent,
   BreadcrumbComponent
];

@NgModule({
   declarations: [
      AppRoutingModule.components,
      ...APP_CONTAINERS
   ],
   imports: [
      BrowserModule,
      NgZorroAntdModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      NgDynamicBreadcrumbModule
   ],
   providers: [
      { provide: NZ_I18N, useValue: en_US }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
