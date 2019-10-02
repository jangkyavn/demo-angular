import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, vi_VN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

registerLocaleData(vi);

import { AppRoutingModule } from './app.routing';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';

import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';

@NgModule({
   declarations: [
      AppComponent,
      AppRoutingModule.components,
      BreadcrumbComponent
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
      { provide: NZ_I18N, useValue: vi_VN }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
