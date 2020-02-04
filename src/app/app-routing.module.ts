import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'machine',
    redirectTo: '',
  },
  {
    path: 'machine',
    loadChildren: () => import('./machine/machine.module').then( m => m.MachinePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  
  exports: [RouterModule]
})
export class AppRoutingModule {}
