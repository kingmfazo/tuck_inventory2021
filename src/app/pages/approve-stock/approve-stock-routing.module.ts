import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveStockPage } from './approve-stock.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveStockPageRoutingModule {}
