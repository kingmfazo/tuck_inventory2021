import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorHomeTabsPageRoutingModule } from './vendor-home-tabs-routing.module';

import { VendorHomeTabsPage } from './vendor-home-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorHomeTabsPageRoutingModule
  ],
  declarations: [VendorHomeTabsPage]
})
export class VendorHomeTabsPageModule {}
