import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfitLossPage } from './profit-loss.page';

const routes: Routes = [
  {
    path: '',
    component: ProfitLossPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfitLossPageRoutingModule {}
