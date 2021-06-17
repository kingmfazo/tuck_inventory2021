import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestStockPage } from './request-stock.page';

const routes: Routes = [
  {
    path: '',
    component: RequestStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestStockPageRoutingModule {}
