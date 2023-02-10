import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {
  reducers,
  metaReducers,
  InterceptorsProviders,
} from '@squilo/services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InterceptorsProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
