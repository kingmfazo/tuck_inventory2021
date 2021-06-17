import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvMoreinfoModalPage } from './inv-moreinfo-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InvMoreinfoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvMoreinfoModalPageRoutingModule {}
