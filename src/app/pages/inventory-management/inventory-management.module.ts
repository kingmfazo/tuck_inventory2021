import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryManagementPageRoutingModule } from './inventory-management-routing.module';

import { InventoryManagementPage } from './inventory-management.page';
import { InvMoreModalComponent } from '../inv-more-modal/inv-more-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryManagementPageRoutingModule,
  ],
  declarations: [InventoryManagementPage, InvMoreModalComponent],
  entryComponents: [InvMoreModalComponent],
})
export class InventoryManagementPageModule {}
