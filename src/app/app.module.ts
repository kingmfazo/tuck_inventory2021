import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { FormsModule } from '@angular/forms'; // <<<< import it here
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Storage } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AccessProviders } from './providers/access-providers';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    // IonicStorageModule.forRoot({
    //   name: '__mydb',
    //   driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    // }),
  ],
  providers: [
    Storage,
    AccessProviders,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
