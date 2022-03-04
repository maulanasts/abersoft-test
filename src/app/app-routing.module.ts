import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: 'view-user',
  //   loadChildren: () => import('../app/view-user/view-user.module').then( m => m.ViewUserPageModule)
  // },
  {
    path: 'create-user',
    loadChildren: () => import('../app/create-user/create-user.module').then( m => m.CreateUserPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
