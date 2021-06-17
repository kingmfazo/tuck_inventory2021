import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsEntryPageRoutingModule } from './products-entry-routing.module';

import { ProductsEntryPage } from './products-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsEntryPageRoutingModule
  ],
  declarations: [ProductsEntryPage]
})
export class ProductsEntryPageModule {}
