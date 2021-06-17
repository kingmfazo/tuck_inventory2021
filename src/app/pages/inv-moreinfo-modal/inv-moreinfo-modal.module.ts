import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvMoreinfoModalPageRoutingModule } from './inv-moreinfo-modal-routing.module';

import { InvMoreinfoModalPage } from './inv-moreinfo-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvMoreinfoModalPageRoutingModule
  ],
  declarations: [InvMoreinfoModalPage]
})
export class InvMoreinfoModalPageModule {}
