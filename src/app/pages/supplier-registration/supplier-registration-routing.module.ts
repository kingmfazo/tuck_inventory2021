import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierRegistrationPage } from './supplier-registration.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRegistrationPageRoutingModule {}
