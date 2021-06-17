import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierRegistrationPageRoutingModule } from './supplier-registration-routing.module';

import { SupplierRegistrationPage } from './supplier-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierRegistrationPageRoutingModule
  ],
  declarations: [SupplierRegistrationPage]
})
export class SupplierRegistrationPageModule {}
