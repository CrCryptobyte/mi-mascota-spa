import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'select-service',
    loadComponent: () =>
      import('./pages/select-service/select-service.page').then(
        (m) => m.SelectServicePage
      ),
  },
  {
    path: 'select-datetime',
    loadComponent: () =>
      import('./pages/select-datetime/select-datetime.page').then(
        (m) => m.SelectDatetimePage
      ),
  },
  {
    path: 'client-data',
    loadComponent: () =>
      import('./pages/client-data/client-data.page').then(
        (m) => m.ClientDataPage
      ),
  },
  {
    path: 'confirmation',
    loadComponent: () =>
      import('./pages/confirmation/confirmation.page').then(
        (m) => m.ConfirmationPage
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.page').then((m) => m.AdminPage),
  },
];
