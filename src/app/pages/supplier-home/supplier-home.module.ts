import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierHomePageRoutingModule } from './supplier-home-routing.module';

import { SupplierHomePage } from './supplier-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierHomePageRoutingModule,
  ],
  declarations: [SupplierHomePage],
  providers: [FormBuilder],
})
export class SupplierHomePageModule {}
