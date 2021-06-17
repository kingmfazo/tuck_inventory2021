import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierTabsPageRoutingModule } from './supplier-tabs-routing.module';

import { SupplierTabsPage } from './supplier-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierTabsPageRoutingModule
  ],
  declarations: [SupplierTabsPage]
})
export class SupplierTabsPageModule {}
