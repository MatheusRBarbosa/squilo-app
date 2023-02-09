import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./+vault/containers/vault-list/vault-list.page').then(
        (p) => p.VaultListPage
      ),
  },
  {
    path: 'message/:id',
    loadComponent: () =>
      import('./view-message/view-message.page').then((c) => c.ViewMessagePage),
  },
  {
    path: '',
    loadComponent: () =>
      import('./+auth/containers/login/login.page').then((p) => p.LoginPage),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
