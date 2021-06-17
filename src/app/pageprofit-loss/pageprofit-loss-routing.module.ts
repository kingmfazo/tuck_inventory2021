import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageprofitLossPage } from './pageprofit-loss.page';

const routes: Routes = [
  {
    path: '',
    component: PageprofitLossPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageprofitLossPageRoutingModule {}
