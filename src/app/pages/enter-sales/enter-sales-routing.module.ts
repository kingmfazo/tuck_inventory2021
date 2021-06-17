import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterSalesPage } from './enter-sales.page';

const routes: Routes = [
  {
    path: '',
    component: EnterSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterSalesPageRoutingModule {}
