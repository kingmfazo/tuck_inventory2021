import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfitLossPageRoutingModule } from './profit-loss-routing.module';

import { ProfitLossPage } from './profit-loss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfitLossPageRoutingModule
  ],
  declarations: [ProfitLossPage]
})
export class ProfitLossPageModule {}
