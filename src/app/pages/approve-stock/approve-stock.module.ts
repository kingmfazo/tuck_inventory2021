import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveStockPageRoutingModule } from './approve-stock-routing.module';

import { ApproveStockPage } from './approve-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveStockPageRoutingModule,
  ],
  declarations: [ApproveStockPage],
  providers: [FormBuilder],
})
export class ApproveStockPageModule {}
