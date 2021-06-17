import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CrudPageRoutingModule } from './crud-routing.module';

import { CrudPage } from './crud.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    CrudPageRoutingModule,
  ],
  declarations: [CrudPage],
})
export class CrudPageModule {}
