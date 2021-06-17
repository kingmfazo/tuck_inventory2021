import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageprofitLossPageRoutingModule } from './pageprofit-loss-routing.module';

import { PageprofitLossPage } from './pageprofit-loss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageprofitLossPageRoutingModule
  ],
  declarations: [PageprofitLossPage]
})
export class PageprofitLossPageModule {}
