import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterSalesPageRoutingModule } from './enter-sales-routing.module';

import { EnterSalesPage } from './enter-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterSalesPageRoutingModule
  ],
  declarations: [EnterSalesPage],
  providers: [FormBuilder],
})
export class EnterSalesPageModule {}
