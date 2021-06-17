import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestStockPageRoutingModule } from './request-stock-routing.module';

import { RequestStockPage } from './request-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestStockPageRoutingModule,
  ],
  declarations: [RequestStockPage],
  providers: [FormBuilder],
})
export class RequestStockPageModule {}
