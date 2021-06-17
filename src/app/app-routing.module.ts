import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./pages/intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'crud/:Identity_Number/:Firstname/:Surname/:Email/:Username/:PhysicalAddress/:Phone_Number',
    loadChildren: () =>
      import('./pages/crud/crud.module').then((m) => m.CrudPageModule),
  },
  {
    path: 'products-entry',
    loadChildren: () =>
      import('./pages/products-entry/products-entry.module').then(
        (m) => m.ProductsEntryPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'inventory-management',
    loadChildren: () =>
      import('./pages/inventory-management/inventory-management.module').then(
        (m) => m.InventoryManagementPageModule
      ),
  },
  {
    path: 'product-add',
    loadChildren: () =>
      import('./pages/product-add/product-add.module').then(
        (m) => m.ProductAddPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./pages/notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./pages/reports/reports.module').then((m) => m.ReportsPageModule),
  },
  {
    path: 'supplier-registration',
    loadChildren: () =>
      import('./pages/supplier-registration/supplier-registration.module').then(
        (m) => m.SupplierRegistrationPageModule
      ),
  },
  {
    path: 'request-stock',
    loadChildren: () =>
      import('./pages/request-stock/request-stock.module').then(
        (m) => m.RequestStockPageModule
      ),
  },
  {
    path: 'approve-stock',
    loadChildren: () =>
      import('./pages/approve-stock/approve-stock.module').then(
        (m) => m.ApproveStockPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./pages/change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },
  {
    path: 'home-tabs',
    loadChildren: () =>
      import('./home-tabs/home-tabs.module').then((m) => m.HomeTabsPageModule),
  },
  {
    path: 'supplier-home',
    loadChildren: () =>
      import('./pages/supplier-home/supplier-home.module').then(
        (m) => m.SupplierHomePageModule
      ),
  },
  {
    path: 'supplier-tabs',
    loadChildren: () =>
      import('./pages/supplier-tabs/supplier-tabs.module').then(
        (m) => m.SupplierTabsPageModule
      ),
  },
  {
    path: 'supplier-orders',
    loadChildren: () =>
      import('./pages/supplier-orders/supplier-orders.module').then(
        (m) => m.SupplierOrdersPageModule
      ),
  },
  {
    path: 'pending-orders',
    loadChildren: () =>
      import('./pages/pending-orders/pending-orders.module').then(
        (m) => m.PendingOrdersPageModule
      ),
  },
  {
    path: 'delivered-orders',
    loadChildren: () =>
      import('./pages/delivered-orders/delivered-orders.module').then(
        (m) => m.DeliveredOrdersPageModule
      ),
  },
  {
    path: 'vendor-home-tabs',
    loadChildren: () =>
      import('./pages/vendor-home-tabs/vendor-home-tabs.module').then(
        (m) => m.VendorHomeTabsPageModule
      ),
  },
  {
    path: 'enter-sales',
    loadChildren: () =>
      import('./pages/enter-sales/enter-sales.module').then(
        (m) => m.EnterSalesPageModule
      ),
  },

  // {
  //   path: 'sales',
  //   loadChildren: () => import('./pages/sales/sales.module').then( m => m.SalesPageModule)
  // },
  // {
  //   path: 'pageprofit-loss',
  //   loadChildren: () => import('./pageprofit-loss/pageprofit-loss.module').then( m => m.PageprofitLossPageModule)
  // },
  // {
  //   path: 'profit-loss',
  //   loadChildren: () => import('./pages/profit-loss/profit-loss.module').then( m => m.ProfitLossPageModule)
  // },
  // {
  //   path: 'stock',
  //   loadChildren: () => import('./pages/stock/stock.module').then( m => m.StockPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
