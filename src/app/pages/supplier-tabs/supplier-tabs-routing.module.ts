import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierTabsPage } from './supplier-tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: SupplierTabsPage,
    children: [
      {
        path: 'supplier-home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../supplier-home/supplier-home.module').then(
                (m) => m.SupplierHomePageModule
              ),
          },
        ],
      },
      {
        path: 'pending-orders',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pending-orders/pending-orders.module').then(
                (m) => m.PendingOrdersPageModule
              ),
          },
        ],
      },
      {
        path: 'delivered-orders',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../delivered-orders/delivered-orders.module').then(
                (m) => m.DeliveredOrdersPageModule
              ),
          },
        ],
      },

      {
        path: '',
        redirectTo: 'tabs/supplier-home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/supplier-home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierTabsPageRoutingModule {}
